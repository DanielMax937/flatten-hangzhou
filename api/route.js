const ROUTERS = {
  foot: 'https://routing.openstreetmap.de/routed-foot/route/v1/driving',
  bike: 'https://routing.openstreetmap.de/routed-bike/route/v1/driving',
};

function parseCoord(value) {
  if (!value || typeof value !== 'string') return null;
  const [lng, lat] = value.split(',').map(Number);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < 29.8 || lat > 30.6 || lng < 119.7 || lng > 120.7) return null;
  return { lng, lat };
}

function haversine(a, b) {
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function sampleGeometry(coords, maxPoints = 60) {
  if (coords.length <= maxPoints) return coords;
  const step = (coords.length - 1) / (maxPoints - 1);
  const out = [];
  for (let i = 0; i < maxPoints; i++) out.push(coords[Math.round(i * step)]);
  return out;
}

function smooth(values) {
  if (values.length < 3) return values;
  return values.map((v, i) => {
    const a = values[Math.max(0, i - 1)];
    const c = values[Math.min(values.length - 1, i + 1)];
    return (a + 2 * v + c) / 4;
  });
}

async function fetchJson(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const r = await fetch(url, { ...options, signal: controller.signal });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

async function elevationForGeometry(geometry) {
  const sampled = sampleGeometry(geometry, 55);
  const locations = sampled.map(([lng, lat]) => ({ latitude: lat, longitude: lng }));
  const data = await fetchJson('https://api.open-elevation.com/api/v1/lookup', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ locations }),
  }, 8500);

  if (!Array.isArray(data.results) || data.results.length !== sampled.length) {
    throw new Error('Elevation response incomplete');
  }

  const elevations = smooth(data.results.map(x => Number(x.elevation)));
  let ascent = 0;
  let maxGrade = 0;

  for (let i = 1; i < elevations.length; i++) {
    const dz = elevations[i] - elevations[i - 1];
    if (dz > 1) ascent += dz;

    const a = { lng: sampled[i - 1][0], lat: sampled[i - 1][1] };
    const b = { lng: sampled[i][0], lat: sampled[i][1] };
    const dx = haversine(a, b);

    if (dx > 8) maxGrade = Math.max(maxGrade, Math.abs(dz) / dx * 100);
  }

  return {
    ascent: Math.max(0, ascent),
    maxGrade: Math.min(maxGrade, 35),
    sampledPoints: sampled.length,
  };
}

function paretoSort(routes) {
  const sorted = [...routes].sort((a, b) => a.distance - b.distance);
  const front = [];
  let bestAscent = Infinity;

  for (const route of sorted) {
    if (!route.elevationAvailable) {
      if (!front.length) front.push(route);
      continue;
    }

    if (route.ascent < bestAscent - 1) {
      front.push(route);
      bestAscent = route.ascent;
    }
  }

  if (front.length < 2 && sorted.length > 1) {
    const flattest = [...sorted]
      .filter(r => r.elevationAvailable)
      .sort((a, b) => a.ascent - b.ascent)[0];

    if (flattest && !front.includes(flattest)) front.push(flattest);
  }

  return front.slice(0, 4);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  const start = parseCoord(req.query.start);
  const end = parseCoord(req.query.end);
  const mode = req.query.mode === 'bike' ? 'bike' : 'foot';

  if (!start || !end) {
    return res.status(400).json({ error: 'Invalid Hangzhou coordinates.' });
  }

  try {
    const base = ROUTERS[mode];
    const url =
      `${base}/${start.lng},${start.lat};${end.lng},${end.lat}` +
      '?overview=full&geometries=geojson&alternatives=3&steps=false';

    const routing = await fetchJson(
      url,
      { headers: { 'user-agent': 'flatten-hangzhou-mvp/1.0' } },
      9000
    );

    if (!Array.isArray(routing.routes) || !routing.routes.length) {
      throw new Error('No routes returned');
    }

    const raw = routing.routes.slice(0, 4);
    const routes = await Promise.all(
      raw.map(async (r, index) => {
        const geometry = r.geometry.coordinates;

        try {
          const e = await elevationForGeometry(geometry);
          return {
            id: `route-${index}`,
            distance: r.distance,
            duration: r.duration,
            geometry,
            ascent: e.ascent,
            maxGrade: e.maxGrade,
            elevationAvailable: true,
            warning: '',
          };
        } catch (err) {
          return {
            id: `route-${index}`,
            distance: r.distance,
            duration: r.duration,
            geometry,
            ascent: null,
            maxGrade: null,
            elevationAvailable: false,
            warning:
              '高程服务本次没有返回完整数据；路线几何仍来自实时 OSM 路由。刷新后可重试。',
          };
        }
      })
    );

    const front = paretoSort(routes);

    return res.status(200).json({
      mode,
      routes: front.length ? front : routes,
      sources: ['OpenStreetMap routing', 'Open-Elevation'],
      limitation:
        'MVP compares router-generated alternatives; production should search the road graph directly with a multi-objective algorithm.',
    });
  } catch (err) {
    return res.status(502).json({
      error: '上游公开路由服务暂时不可用，请稍后重试。',
      detail: String(err && err.message ? err.message : err),
    });
  }
};
