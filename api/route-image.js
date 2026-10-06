const IMAGES = {
  'hongyadong-night': {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Hongyadong_night_lights_Chongqing.jpg/960px-Hongyadong_night_lights_Chongqing.jpg',
  },
  'liziba-train': {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/A_train_of_Chongqing_Rail_Transit_Line_2_coming_through_a_residential_building_at_Liziba.jpg/1280px-A_train_of_Chongqing_Rail_Transit_Line_2_coming_through_a_residential_building_at_Liziba.jpg',
  },
  'shibati-old-street': {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/%E5%8D%81%E5%85%AB%E6%A2%AF%E8%80%81%E8%A1%97_-_Old_Street_in_Shibati_Area_-_2015.04_-_panoramio.jpg/1280px-%E5%8D%81%E5%85%AB%E6%A2%AF%E8%80%81%E8%A1%97_-_Old_Street_in_Shibati_Area_-_2015.04_-_panoramio.jpg',
  },
};

module.exports = async function handler(req, res) {
  const image = IMAGES[req.query.id];

  if (!image) {
    return res.status(404).json({ error: 'Unknown route image.' });
  }

  try {
    const upstream = await fetch(image.url, {
      headers: {
        'user-agent': 'FlattenCity/1.0 (https://github.com/DanielMax937/flatten-hangzhou)',
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!upstream.ok) {
      throw new Error(`Wikimedia image HTTP ${upstream.status}`);
    }

    const body = Buffer.from(await upstream.arrayBuffer());

    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/jpeg');
    res.setHeader(
      'Cache-Control',
      'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=7776000'
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(body);
  } catch (error) {
    return res.status(502).json({
      error: 'Route image is temporarily unavailable.',
      detail: String(error && error.message ? error.message : error),
    });
  }
};
