# OREV Web

## 环境要求

### 最低
- Node.js >= 16.14.0
- npm >= 8.3.0


## 推荐
- Node.js >= 18.x
- npm >= 9.x

## 项目设置

1. 克隆项目
```bash
git clone <项目仓库地址>
cd orev-web
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 项目结构

```
orev-web/
├── public/          # 数据资源
│   ├── boards.json  # 首页数据
|   |—— resources     # md文件
│   └── products/    # 板卡子页面数据  
├── src/
│   ├── assets/      # 图片资源
│   ├── components/  # 公共组件
│   ├── views/       # 页面组件
|   |——— App         # 根组件
|   |——— main        # 应用入口文件
│   └── router/      # 路由配置
|—— package.json     # 项目配置文件
|—— index.html       # HTML 入口文件
|—— flexible.js      # 移动端自适应方案:flexible + rem
|—— package.json     # 依赖配置
|—— README.md        # 依赖配置
|__ vite.config.js   # Vite 配置文件
```

