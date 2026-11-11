# Scylla Lighting 项目记忆

- 2026-11-11：从 machinery 基线创建；交付仓库为 https://github.com/phineco/scyllalighting ，开发分支 codex/lighting-site。
- 品牌 Scylla Lighting / 锡拉照明；运营主体安徽锡拉科技有限公司。
- 一期为中英文 B2B 精选目录和 OEM/ODM 询盘，八个分类各展示少量代表系列。禁止公开上游名称、联系方式、带品牌图册及原始素材元数据。
- 制造表述使用生产配套能力，不虚构工厂所有权、产能、证书或交期。
- 询盘使用服务端环境变量 INQUIRY_API_URL 配置 Java 接口；未配置时返回不可用，不模拟成功。
- 原项目 package-lock 与 package.json 不一致；需重新生成锁文件后执行 npm ci。
- 首版已通过生产构建、ESLint、TypeScript、14 个双语页面检查、真实 404、公开禁词扫描、询盘数据校验与本地模拟后台保存合同测试。浏览器验证了 390px 无溢出、手机导航、语言切换、产品预选和接口未配置时保留输入。
- 语言切换采用完整导航，以更新根 HTML lang；POST 来源校验使用 SITE_URL 或原始 Host，避免 Next.js 内部地址规范化导致误拒绝。
- 原始 Logo 裁成横版，并生成同源灯泡图标；公开图片总计约 600KB。视频暂未发布，待逐帧去标识后再使用。
- 源仓库历史保留；旧 dev.db 只保存在本地，不再纳入新版本快照。
- 2026-11-11：用户提供新版品牌素材。导航使用原始透明横版 PNG；favicon 使用原始 32/64 PNG，并无重采样封装为 ICO。黑白 Logo 实际为 JPEG；标注 1024 的图标实际 1929×1929，按实际格式保存在 assets/brand。原始小图标留白较大，按用户原稿接入。
