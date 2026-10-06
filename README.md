# Flatten City

城市避坡路线 MVP：在“最短”和“更平”之间比较路线。

**默认城市：重庆**。杭州作为第二个实验城市保留。

重庆比杭州更适合作为这个产品的默认展示城市，因为高差、坡道和立体交通更密集，更容易体现“最短距离”和“最低体力成本”之间的差异。

## MVP 功能

- 城市切换：重庆 / 杭州
- 默认重庆
- 步行 / 骑行模式
- OpenStreetMap 路由候选
- Open-Elevation 高程采样
- 累计爬升与最大坡度估算
- Shortest → Flatter 路线比较滑杆
- Leaflet 地图可视化
- 外国游客社媒热门推荐线路

## 重庆社媒热门推荐线路

### 1. Cyberpunk 夜景线

魁星楼 → 解放碑 → 洪崖洞 → 重庆来福士 / 朝天门

重点是最典型的“8D / cyberpunk Chongqing”视觉：楼层错位、山城夜景、江岸高楼。

### 2. 8D 魔幻城市线

李子坝 → 鹅岭公园 → 魁星楼 → 洪崖洞

聚焦外国旅行 vlog 最常出现的“穿楼轻轨 + 多层城市 + 夜景”。

### 3. 老重庆坡城线

十八梯 → 长江索道 → 龙门浩老街 → 下浩里

偏向老街、阶梯、江景和坡城肌理；下浩里 / 龙门浩近年在 X 和 Instagram 外国摄影旅行内容中频繁出现。

## 社媒调研依据

以下是本轮用于筛选重庆点位的公开来源（2026-10-06 检索）：

- Tube2Trip 的 12 个 YouTube 重庆旅行视频聚合：洪崖洞出现在 9 个视频、李子坝 7 个、磁器口 4 个，解放碑和来福士各 3 个。
  https://tube2trip.com/en/destinations/china/chongqing
- Homeless Pelican 2026 重庆 vlog：魁星楼、来福士、洪崖洞、李子坝、下浩里等被列为 iconic / viral locations。
  https://china.izy.cn/china/video-fC-yPa8gr-c
- Two Mad Explorers 的磁器口重庆视频。
  https://www.youtube.com/watch?v=vLV_43p_3qU
- Jay and Karolina 的重庆 vlog：解放碑、魁星楼、李子坝、洪崖洞。
  https://china.izy.cn/china/video-HDYAy3dKdn8
- X：Jenny Lam 的下浩里 / 龙门浩老街内容，同时链接其 Instagram 原帖。
  https://x.com/iChongqing_CIMC/status/1990284764742328420
- 重庆英文官网对外国 influencer 的汇总，也反复提到洪崖洞、魁星楼和李子坝。
  https://www.ichongqing.info/2025/01/21/chongqing-through-the-eyes-of-foreign-influencers-lets-meet/

Instagram 的网页公开索引比 YouTube / X 弱，因此本轮对 Instagram 主要采用公开可检索的 Instagram 交叉发布链接与提及，而没有把不可公开索引的帖子当作可验证数据。

## 架构

```
Browser
  ├─ Leaflet + OpenStreetMap tiles
  └─ /api/route
       ├─ OSM public routing
       └─ Open-Elevation
```

推荐线路由多个路段组成。客户端分别请求每个路段的候选路线，然后聚合出：

- 推荐线 · 最短
- 推荐线 · 更平

因此整条 sightseeing route 仍然可以比较距离与累计爬升。

## 本地运行

这是一个零依赖的静态前端 + Vercel Serverless Function 项目。

```bash
npx vercel dev
```

然后打开 http://localhost:3000 。

## 当前限制

MVP 仍然依赖公开路由器生成候选路线，还没有直接在城市完整道路图上执行多目标搜索。

正式版计划：

1. 下载重庆、杭州的 Overture / OSM 路网
2. 结合 AW3D30 或更高精度 DEM
3. 对每条 edge 预计算 distance / ascent / grade
4. 使用 BOA* 计算 (distance, ascent) Pareto frontier
5. 用 WebWorker / 分片图数据在浏览器端执行路线搜索

## 部署

项目可直接部署到 Vercel。


## 推荐线路图片

推荐线路的代表图通过 `/api/route-image` 从 Wikimedia Commons 拉取，并由 Vercel CDN 缓存。前端不直接热链第三方图片。

- Cyberpunk 夜景线：Hongyadong night lights Chongqing.jpg — Lianguanlun — CC BY 4.0
  https://commons.wikimedia.org/wiki/File:Hongyadong_night_lights_Chongqing.jpg
- 8D 魔幻城市线：A train of Chongqing Rail Transit Line 2 coming through a residential building at Liziba.jpg — Chen Hualin — CC BY-SA 4.0
  https://commons.wikimedia.org/wiki/File:A_train_of_Chongqing_Rail_Transit_Line_2_coming_through_a_residential_building_at_Liziba.jpg
- 老重庆坡城线：十八梯老街 - Old Street in Shibati Area - 2015.04 - panoramio.jpg — rheins — CC BY 3.0
  https://commons.wikimedia.org/wiki/File:%E5%8D%81%E5%85%AB%E6%A2%AF%E8%80%81%E8%A1%97_-_Old_Street_in_Shibati_Area_-_2015.04_-_panoramio.jpg

应用界面中也会显示摄影者和许可证链接。
