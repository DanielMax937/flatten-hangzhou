const CITIES = {
  chongqing: {
    name: '重庆',
    label: 'CHONGQING',
    center: [29.558, 106.555],
    zoom: 13,
    defaultStart: 'jiefangbei',
    defaultEnd: 'nanshan',
    places: [
      { id: 'jiefangbei', name: '解放碑', lat: 29.55962, lng: 106.57319 },
      { id: 'kuixing', name: '魁星楼', lat: 29.560258, lng: 106.573618 },
      { id: 'hongyadong', name: '洪崖洞', lat: 29.56509, lng: 106.57534 },
      { id: 'qiansimen', name: '千厮门大桥', lat: 29.568209, lng: 106.57561 },
      { id: 'raffles', name: '重庆来福士 / 朝天门', lat: 29.56818, lng: 106.583766 },
      { id: 'grandtheatre', name: '重庆大剧院', lat: 29.57274, lng: 106.57748 },
      { id: 'liziba', name: '李子坝', lat: 29.55346, lng: 106.52682 },
      { id: 'eling', name: '鹅岭公园', lat: 29.55251, lng: 106.53249 },
      { id: 'shibati', name: '十八梯', lat: 29.5555, lng: 106.5745 },
      { id: 'cableway', name: '长江索道（新华路站）', lat: 29.5560, lng: 106.5790 },
      { id: 'longmenhao', name: '龙门浩老街', lat: 29.55889, lng: 106.59106 },
      { id: 'xiahaoli', name: '下浩里', lat: 29.557588, lng: 106.595746 },
      { id: 'nanshan', name: '南山一棵树', lat: 29.54822, lng: 106.59881 },
      { id: 'ciqikou', name: '磁器口古镇', lat: 29.58376, lng: 106.44572 },
    ],
    recommendations: [
      {
        id: 'viral-night',
        name: 'Cyberpunk 夜景线',
        duration: '3–5h',
        description: 'YouTube 高频核心：立体楼层、霓虹夜景、两江汇流。',
        intro: '从魁星楼的立体错层出发，穿过解放碑，再走到洪崖洞与朝天门来福士。最好在傍晚启程：前半段看山城空间，后半段正好进入重庆最有辨识度的霓虹夜景。',
        stops: ['kuixing', 'jiefangbei', 'hongyadong', 'raffles'],
        imageId: 'hongyadong-night',
        imageAlt: '重庆洪崖洞夜景',
        photo: {
          author: 'Lianguanlun',
          license: 'CC BY 4.0',
          source: 'https://commons.wikimedia.org/wiki/File:Hongyadong_night_lights_Chongqing.jpg',
          licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
        },
      },
      {
        id: 'vertical-city',
        name: '8D 魔幻城市线',
        duration: '半日',
        description: '外国 vlog 最常见的城市奇观组合：穿楼轻轨 + 山城层级。',
        intro: '先看李子坝轻轨从居民楼中穿过，再到鹅岭感受城市高差，最后回到魁星楼和洪崖洞。它最适合第一次理解重庆为什么被叫作“8D 城市”：轨道、道路、楼层和山体在不同高度交叠。',
        stops: ['liziba', 'eling', 'kuixing', 'hongyadong'],
        imageId: 'liziba-train',
        imageAlt: '李子坝轻轨穿楼',
        photo: {
          author: 'Chen Hualin',
          license: 'CC BY-SA 4.0',
          source: 'https://commons.wikimedia.org/wiki/File:A_train_of_Chongqing_Rail_Transit_Line_2_coming_through_a_residential_building_at_Liziba.jpg',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      },
      {
        id: 'old-chongqing',
        name: '老重庆坡城线',
        duration: '3–4h',
        description: 'Instagram / X 新宠：台阶老街、索道、南岸山城街巷。',
        intro: '从十八梯的石阶与老街出发，经长江索道跨江，到龙门浩和下浩里慢慢走。这里的重点不是追地标，而是体验重庆真正的“坡城”肌理：台阶、坡道、旧街、江岸和不断变化的视线高度。',
        stops: ['shibati', 'cableway', 'longmenhao', 'xiahaoli'],
        imageId: 'shibati-old-street',
        imageAlt: '重庆十八梯老街',
        photo: {
          author: 'rheins',
          license: 'CC BY 3.0',
          source: 'https://commons.wikimedia.org/wiki/File:%E5%8D%81%E5%85%AB%E6%A2%AF%E8%80%81%E8%A1%97_-_Old_Street_in_Shibati_Area_-_2015.04_-_panoramio.jpg',
          licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
        },
      },
    ],
  },

  hangzhou: {
    name: '杭州',
    label: 'HANGZHOU',
    center: [30.252, 120.125],
    zoom: 13,
    defaultStart: 'wulin',
    defaultEnd: 'lingyin',
    places: [
      { id: 'wulin', name: '武林广场', lat: 30.27415, lng: 120.16364 },
      { id: 'hubin', name: '湖滨步行街', lat: 30.25735, lng: 120.16117 },
      { id: 'yuquan', name: '浙江大学玉泉校区', lat: 30.26386, lng: 120.12686 },
      { id: 'lingyin', name: '灵隐寺', lat: 30.24068, lng: 120.10239 },
      { id: 'leifeng', name: '雷峰塔', lat: 30.23118, lng: 120.14817 },
      { id: 'longjing', name: '龙井村', lat: 30.21698, lng: 120.11134 },
      { id: 'xixi', name: '西溪国家湿地公园', lat: 30.27033, lng: 120.06128 },
      { id: 'east', name: '杭州东站', lat: 30.29206, lng: 120.21199 },
    ],
    recommendations: [],
  },
};

const cityEl = document.querySelector('#city');
const startEl = document.querySelector('#start');
const endEl = document.querySelector('#end');
const routeBtn = document.querySelector('#routeBtn');
const statusEl = document.querySelector('#status');
const resultEl = document.querySelector('#result');
const tradeoffEl = document.querySelector('#tradeoff');
const noticeEl = document.querySelector('#notice');
const eyebrowEl = document.querySelector('#eyebrow');
const socialRoutesEl = document.querySelector('#socialRoutes');
const routeCardsEl = document.querySelector('#routeCards');
const routeFeatureEl = document.querySelector('#routeFeature');
const routePhotoEl = document.querySelector('#routePhoto');
const routePhotoCreditEl = document.querySelector('#routePhotoCredit');
const routeFeatureTitleEl = document.querySelector('#routeFeatureTitle');
const routeFeatureIntroEl = document.querySelector('#routeFeatureIntro');
const routeStopsEl = document.querySelector('#routeStops');

let cityKey = 'chongqing';
let mode = 'foot';
let routes = [];
let activeIndex = 0;
let activeRecommendationId = null;

for (const [key, city] of Object.entries(CITIES)) {
  cityEl.add(new Option(city.name, key));
}
cityEl.value = cityKey;

const map = L.map('map', { zoomControl: false }).setView(
  CITIES[cityKey].center,
  CITIES[cityKey].zoom
);
L.control.zoom({ position: 'bottomright' }).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

let routeLayers = [];
let markers = [];

function currentCity() {
  return CITIES[cityKey];
}

function getPlace(id) {
  return currentCity().places.find(p => p.id === id);
}

function populatePlaces() {
  const city = currentCity();
  startEl.innerHTML = '';
  endEl.innerHTML = '';

  for (const p of city.places) {
    startEl.add(new Option(p.name, p.id));
    endEl.add(new Option(p.name, p.id));
  }

  startEl.value = city.defaultStart;
  endEl.value = city.defaultEnd;
  eyebrowEl.textContent = `${city.label} · ROUTE LAB`;
  document.title = `Flatten City · ${city.name}避坡地图`;
  renderRecommendations();
}

function renderRecommendations() {
  const recommendations = currentCity().recommendations || [];
  routeCardsEl.innerHTML = '';
  routeFeatureEl.classList.add('hidden');
  activeRecommendationId = null;

  if (!recommendations.length) {
    socialRoutesEl.classList.add('hidden');
    return;
  }

  socialRoutesEl.classList.remove('hidden');

  for (const route of recommendations) {
    const button = document.createElement('button');
    button.className = 'route-card';
    button.type = 'button';
    button.dataset.routeId = route.id;
    button.innerHTML = `
      <span class="route-card-top">
        <span class="route-card-title">${route.name}</span>
        <span class="route-card-time">${route.duration}</span>
      </span>
      <span class="route-card-desc">${route.description}</span>
    `;

    button.addEventListener('click', () => loadRecommendation(route.id));
    routeCardsEl.appendChild(button);
  }
}

function showRecommendationStory(recommendation, stopPlaces) {
  routeFeatureTitleEl.textContent = recommendation.name;
  routeFeatureIntroEl.textContent = recommendation.intro;
  routePhotoEl.src = `/api/route-image?id=${encodeURIComponent(recommendation.imageId)}`;
  routePhotoEl.alt = recommendation.imageAlt;

  routePhotoEl.onerror = () => {
    routePhotoEl.removeAttribute('src');
    routePhotoEl.alt = '图片暂时加载失败';
  };

  const photo = recommendation.photo;
  routePhotoCreditEl.innerHTML =
    `Photo: <a href="${photo.source}" target="_blank" rel="noreferrer">${photo.author}</a> · ` +
    `<a href="${photo.licenseUrl}" target="_blank" rel="noreferrer">${photo.license}</a> · Wikimedia Commons`;

  routeStopsEl.innerHTML =
    '<strong>途经</strong><br>' +
    stopPlaces.map((p, i) => `${i + 1}. ${p.name}`).join(' → ');

  routeFeatureEl.classList.remove('hidden');
}

function fmtKm(m) {
  return `${(m / 1000).toFixed(m > 10000 ? 1 : 2)} km`;
}

function fmtM(m) {
  return `${Math.round(m || 0)} m`;
}

function fmtGrade(g) {
  return `${(g || 0).toFixed(1)}%`;
}

function setStatus(text, error = false) {
  statusEl.textContent = text;
  statusEl.style.color = error ? '#a33c2f' : '';
}

function clearMap() {
  routeLayers.forEach(l => map.removeLayer(l));
  markers.forEach(m => map.removeLayer(m));
  routeLayers = [];
  markers = [];
}

function palette(index, selected) {
  if (selected) return { color: '#176946', weight: 7, opacity: .95 };

  return {
    color: index === 0 ? '#65756a' : '#8ea096',
    weight: 4,
    opacity: .42,
  };
}

function drawRoutes(selectedIndex) {
  routeLayers.forEach(l => map.removeLayer(l));
  routeLayers = [];

  routes.forEach((route, i) => {
    const layer = L.polyline(
      route.geometry.map(([lng, lat]) => [lat, lng]),
      palette(i, i === selectedIndex)
    ).addTo(map);

    if (i === selectedIndex) layer.bringToFront();
    routeLayers.push(layer);
  });
}

function drawPlaceMarkers(placeIds) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  placeIds.forEach((id, index) => {
    const p = getPlace(id);
    if (!p) return;

    const label = placeIds.length > 2 ? `${index + 1}. ${p.name}` : p.name;
    markers.push(
      L.marker([p.lat, p.lng])
        .addTo(map)
        .bindTooltip(label, { permanent: false })
    );
  });
}

function drawEndpoints() {
  drawPlaceMarkers([startEl.value, endEl.value]);
}

function pickIndex(value) {
  if (!routes.length) return 0;
  return Math.round((Number(value) / 100) * (routes.length - 1));
}

function render(index) {
  activeIndex = Math.max(0, Math.min(index, routes.length - 1));
  const r = routes[activeIndex];
  const shortest = routes[0];

  document.querySelector('#routeName').textContent =
    r.label ||
    (activeIndex === 0
      ? '最短路线'
      : activeIndex === routes.length - 1
        ? '更平路线'
        : '平衡路线');

  document.querySelector('#distance').textContent = fmtKm(r.distance);
  document.querySelector('#ascent').textContent =
    r.elevationAvailable ? fmtM(r.ascent) : '待高程';
  document.querySelector('#grade').textContent =
    r.elevationAvailable ? fmtGrade(r.maxGrade) : '待高程';
  document.querySelector('#sourceBadge').textContent =
    activeRecommendationId
      ? 'SOCIAL ROUTE'
      : r.elevationAvailable
        ? 'LIVE DEM'
        : 'ROUTE ONLY';

  const extra = r.distance - shortest.distance;
  const saved = (shortest.ascent || 0) - (r.ascent || 0);

  document.querySelector('#comparison').textContent =
    activeIndex === 0
      ? '基准：当前方案中距离最短的路线。'
      : r.elevationAvailable && shortest.elevationAvailable
        ? `相比最短方案，多走 ${fmtM(extra)}，少爬 ${fmtM(Math.max(0, saved))}。`
        : `相比最短方案，多走 ${fmtM(extra)}；高程服务暂未返回完整数据。`;

  noticeEl.textContent = r.warning || '';
  drawRoutes(activeIndex);
}

async function fetchSegment(a, b) {
  const params = new URLSearchParams({
    city: cityKey,
    mode,
    start: `${a.lng},${a.lat}`,
    end: `${b.lng},${b.lat}`,
  });

  const res = await fetch(`/api/route?${params}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || '路线计算失败');

  const candidates = data.routes || [];
  if (!candidates.length) throw new Error('没有找到可用路线');

  candidates.sort((x, y) => x.distance - y.distance);
  return candidates;
}

function combineSegments(segmentCandidates, variant) {
  const selected = segmentCandidates.map(candidates => {
    if (variant === 'flat') {
      const elevationCandidates = candidates.filter(x => x.elevationAvailable);
      if (elevationCandidates.length) {
        return [...elevationCandidates].sort((a, b) => a.ascent - b.ascent)[0];
      }
    }

    return candidates[0];
  });

  const geometry = [];
  let distance = 0;
  let ascent = 0;
  let maxGrade = 0;
  let elevationAvailable = true;
  const warnings = [];

  selected.forEach((route, index) => {
    const segmentGeometry = index === 0 ? route.geometry : route.geometry.slice(1);
    geometry.push(...segmentGeometry);
    distance += route.distance || 0;

    if (route.elevationAvailable) {
      ascent += route.ascent || 0;
      maxGrade = Math.max(maxGrade, route.maxGrade || 0);
    } else {
      elevationAvailable = false;
    }

    if (route.warning) warnings.push(route.warning);
  });

  return {
    id: `recommendation-${variant}`,
    label: variant === 'flat' ? '推荐线 · 更平' : '推荐线 · 最短',
    distance,
    ascent: elevationAvailable ? ascent : null,
    maxGrade: elevationAvailable ? maxGrade : null,
    elevationAvailable,
    geometry,
    warning: [...new Set(warnings)].join(' '),
  };
}

async function loadRecommendation(routeId) {
  const recommendation = currentCity().recommendations.find(x => x.id === routeId);
  if (!recommendation) return;

  activeRecommendationId = routeId;
  document.querySelectorAll('.route-card').forEach(card => {
    card.classList.toggle('active', card.dataset.routeId === routeId);
  });

  const stopPlaces = recommendation.stops.map(getPlace).filter(Boolean);
  showRecommendationStory(recommendation, stopPlaces);

  startEl.value = recommendation.stops[0];
  endEl.value = recommendation.stops[recommendation.stops.length - 1];

  routeBtn.disabled = true;
  resultEl.classList.add('hidden');
  setStatus(`正在计算「${recommendation.name}」的 ${stopPlaces.length - 1} 个路段…`);
  clearMap();
  drawPlaceMarkers(recommendation.stops);

  try {
    const segmentPairs = [];

    for (let i = 0; i < stopPlaces.length - 1; i++) {
      segmentPairs.push([stopPlaces[i], stopPlaces[i + 1]]);
    }

    const segmentCandidates = await Promise.all(
      segmentPairs.map(([a, b]) => fetchSegment(a, b))
    );

    const shortest = combineSegments(segmentCandidates, 'short');
    const flatter = combineSegments(segmentCandidates, 'flat');

    routes = [shortest];

    const meaningfullyDifferent =
      Math.abs(flatter.distance - shortest.distance) > 20 ||
      (flatter.elevationAvailable &&
        shortest.elevationAvailable &&
        Math.abs(flatter.ascent - shortest.ascent) > 2);

    if (meaningfullyDifferent) routes.push(flatter);

    tradeoffEl.value = '0';
    resultEl.classList.remove('hidden');
    render(0);

    const all = routes.flatMap(r => r.geometry.map(([lng, lat]) => [lat, lng]));
    if (all.length) map.fitBounds(L.latLngBounds(all), { padding: [36, 36] });

    setStatus(
      `已生成「${recommendation.name}」：${stopPlaces.map(p => p.name).join(' → ')}。`
    );
  } catch (err) {
    console.error(err);
    setStatus(`推荐线路计算失败：${err.message}`, true);
  } finally {
    routeBtn.disabled = false;
  }
}

async function calculate() {
  activeRecommendationId = null;
  document.querySelectorAll('.route-card').forEach(card => {
    card.classList.remove('active');
  });
  routeFeatureEl.classList.add('hidden');

  if (startEl.value === endEl.value) {
    setStatus('起点和终点不能相同。', true);
    return;
  }

  const start = getPlace(startEl.value);
  const end = getPlace(endEl.value);

  routeBtn.disabled = true;
  resultEl.classList.add('hidden');
  setStatus(`正在计算${currentCity().name}路线并采样高程…`);
  clearMap();
  drawEndpoints();

  try {
    const candidates = await fetchSegment(start, end);
    routes = candidates;
    tradeoffEl.value = '0';
    resultEl.classList.remove('hidden');
    render(0);

    const all = routes.flatMap(r => r.geometry.map(([lng, lat]) => [lat, lng]));
    if (all.length) map.fitBounds(L.latLngBounds(all), { padding: [36, 36] });

    setStatus(`找到 ${routes.length} 条候选路线。拖动滑杆比较距离和爬升。`);
  } catch (err) {
    console.error(err);
    setStatus(`计算失败：${err.message}`, true);
  } finally {
    routeBtn.disabled = false;
  }
}

function changeCity(nextCity) {
  cityKey = nextCity;
  routes = [];
  resultEl.classList.add('hidden');
  clearMap();
  populatePlaces();

  const city = currentCity();
  map.setView(city.center, city.zoom);
  drawEndpoints();

  if (cityKey === 'chongqing' && city.recommendations.length) {
    loadRecommendation(city.recommendations[0].id);
  } else {
    calculate();
  }
}

document.querySelectorAll('.mode').forEach(btn =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode').forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    mode = btn.dataset.mode;

    if (activeRecommendationId) {
      loadRecommendation(activeRecommendationId);
    }
  })
);

cityEl.addEventListener('change', () => changeCity(cityEl.value));
routeBtn.addEventListener('click', calculate);
tradeoffEl.addEventListener('input', () => render(pickIndex(tradeoffEl.value)));
startEl.addEventListener('change', drawEndpoints);
endEl.addEventListener('change', drawEndpoints);

populatePlaces();
drawEndpoints();
loadRecommendation('viral-night');
