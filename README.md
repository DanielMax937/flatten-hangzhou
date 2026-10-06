# Flatten Hangzhou

杭州避坡路线 MVP：在“最短”和“更平”之间比较路线。

## MVP 功能

- 杭州典型地点起终点
- 步行 / 骑行模式
- OpenStreetMap 路由候选
- Open-Elevation 高程采样
- 累计爬升与最大坡度估算
- Shortest → Flatter 路线比较滑杆
- Leaflet 地图可视化

## 架构

```
Browser
  ├─ Leaflet + OpenStreetMap tiles
  └─ /api/route
       ├─ OSM public routing
       └─ Open-Elevation
```

## 本地运行

这是一个零依赖的静态前端 + Vercel Serverless Function 项目。

```bash
npx vercel dev
```

然后打开 http://localhost:3000 。

## 当前限制

MVP 只比较公开路由器生成的候选路线，还没有直接在杭州完整道路图上执行多目标搜索。

正式版计划：

1. 下载杭州 Overture / OSM 路网
2. 结合 AW3D30 或更高精度 DEM
3. 对每条 edge 预计算 distance / ascent / grade
4. 使用 BOA* 计算 (distance, ascent) Pareto frontier
5. 用 WebWorker / 分片图数据在浏览器端执行路线搜索

## 部署

项目可直接部署到 Vercel。
