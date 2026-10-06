const PLACES = [
  { id: 'wulin', name: '武林广场', lat: 30.27415, lng: 120.16364 },
  { id: 'hubin', name: '湖滨步行街', lat: 30.25735, lng: 120.16117 },
  { id: 'yuquan', name: '浙江大学玉泉校区', lat: 30.26386, lng: 120.12686 },
  { id: 'lingyin', name: '灵隐寺', lat: 30.24068, lng: 120.10239 },
  { id: 'leifeng', name: '雷峰塔', lat: 30.23118, lng: 120.14817 },
  { id: 'longjing', name: '龙井村', lat: 30.21698, lng: 120.11134 },
  { id: 'xixi', name: '西溪国家湿地公园', lat: 30.27033, lng: 120.06128 },
  { id: 'east', name: '杭州东站', lat: 30.29206, lng: 120.21199 },
];
const startEl = document.querySelector('#start');
const endEl = document.querySelector('#end');
const routeBtn = document.querySelector('#routeBtn');
const statusEl = document.querySelector('#status');
const resultEl = document.querySelector('#result');
const tradeoffEl = document.querySelector('#tradeoff');
const noticeEl = document.querySelector('#notice');
let mode = 'foot';
let routes = [];
let activeIndex = 0;
for (const p of PLACES) { startEl.add(new Option(p.name, p.id)); endEl.add(new Option(p.name, p.id)); }
startEl.value = 'wulin';
endEl.value = 'lingyin';
const map = L.map('map', { zoomControl: false }).setView([30.252, 120.125], 13);
L.control.zoom({ position: 'bottomright' }).addTo(map);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
let routeLayers = [];
let markers = [];
function getPlace(id) { return PLACES.find(p => p.id === id); }
function fmtKm(m) { return `${(m / 1000).toFixed(m > 10000 ? 1 : 2)} km`; }
function fmtM(m) { return `${Math.round(m || 0)} m`; }
function fmtGrade(g) { return `${(g || 0).toFixed(1)}%`; }
function setStatus(text, error = false) { statusEl.textContent = text; statusEl.style.color = error ? '#a33c2f' : ''; }
function clearMap() { routeLayers.forEach(l => map.removeLayer(l)); markers.forEach(m => map.removeLayer(m)); routeLayers = []; markers = []; }
function palette(index, selected) { if (selected) return { color: '#176946', weight: 7, opacity: .95 }; return { color: index === 0 ? '#65756a' : '#8ea096', weight: 4, opacity: .42 }; }
function drawRoutes(selectedIndex) {
  routeLayers.forEach(l => map.removeLayer(l)); routeLayers = [];
  routes.forEach((route, i) => {
    const layer = L.polyline(route.geometry.map(([lng, lat]) => [lat, lng]), palette(i, i === selectedIndex)).addTo(map);
    if (i === selectedIndex) layer.bringToFront();
    routeLayers.push(layer);
  });
}
function drawEndpoints() {
  markers.forEach(m => map.removeLayer(m)); markers = [];
  const a = getPlace(startEl.value); const b = getPlace(endEl.value);
  markers.push(L.marker([a.lat, a.lng]).addTo(map).bindTooltip(`起点 · ${a.name}`, { permanent: false }));
  markers.push(L.marker([b.lat, b.lng]).addTo(map).bindTooltip(`终点 · ${b.name}`, { permanent: false }));
}
function pickIndex(value) { if (!routes.length) return 0; return Math.round((Number(value) / 100) * (routes.length - 1)); }
function render(index) {
  activeIndex = Math.max(0, Math.min(index, routes.length - 1));
  const r = routes[activeIndex]; const shortest = routes[0];
  document.querySelector('#routeName').textContent = activeIndex === 0 ? '最短路线' : activeIndex === routes.length - 1 ? '更平路线' : '平衡路线';
  document.querySelector('#distance').textContent = fmtKm(r.distance);
  document.querySelector('#ascent').textContent = r.elevationAvailable ? fmtM(r.ascent) : '待高程';
  document.querySelector('#grade').textContent = r.elevationAvailable ? fmtGrade(r.maxGrade) : '待高程';
  document.querySelector('#sourceBadge').textContent = r.elevationAvailable ? 'LIVE DEM' : 'ROUTE ONLY';
  const extra = r.distance - shortest.distance;
  const saved = (shortest.ascent || 0) - (r.ascent || 0);
  document.querySelector('#comparison').textContent = activeIndex === 0
    ? '基准：当前候选中距离最短的路线。'
    : r.elevationAvailable && shortest.elevationAvailable
      ? `相比最短路线，多走 ${fmtM(extra)}，少爬 ${fmtM(Math.max(0, saved))}。`
      : `相比最短路线，多走 ${fmtM(extra)}；高程服务暂未返回完整数据。`;
  noticeEl.textContent = r.warning || '';
  drawRoutes(activeIndex);
}
async function calculate() {
  if (startEl.value === endEl.value) { setStatus('起点和终点不能相同。', true); return; }
  const start = getPlace(startEl.value); const end = getPlace(endEl.value);
  routeBtn.disabled = true; resultEl.classList.add('hidden'); setStatus('正在获取候选路线并采样高程…'); clearMap(); drawEndpoints();
  try {
    const params = new URLSearchParams({ mode, start: `${start.lng},${start.lat}`, end: `${end.lng},${end.lat}` });
    const res = await fetch(`/api/route?${params}`); const data = await res.json();
    if (!res.ok) throw new Error(data.error || '路线计算失败');
    routes = data.routes || []; if (!routes.length) throw new Error('没有找到可用路线');
    routes.sort((a, b) => a.distance - b.distance); tradeoffEl.value = '0'; resultEl.classList.remove('hidden'); render(0);
    const all = routes.flatMap(r => r.geometry.map(([lng, lat]) => [lat, lng]));
    if (all.length) map.fitBounds(L.latLngBounds(all), { padding: [36, 36] });
    setStatus(`找到 ${routes.length} 条候选路线。拖动滑杆比较距离和爬升。`);
  } catch (err) { console.error(err); setStatus(`计算失败：${err.message}`, true); } finally { routeBtn.disabled = false; }
}
document.querySelectorAll('.mode').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.mode').forEach(x => x.classList.remove('active')); btn.classList.add('active'); mode = btn.dataset.mode;
}));
routeBtn.addEventListener('click', calculate);
tradeoffEl.addEventListener('input', () => render(pickIndex(tradeoffEl.value)));
startEl.addEventListener('change', drawEndpoints);
endEl.addEventListener('change', drawEndpoints);
drawEndpoints();
calculate();