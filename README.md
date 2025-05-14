# Vue3 + TypeScript + Vite 模板项目

这是一个基于 **Vue 3 + TypeScript + Vite** 的前端项目模板，内置常用开发配置和工具，开箱即用。适合用于中大型项目的快速启动和二次开发。

## 🚀 技术栈

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) - 状态管理
- [Vue Router](https://router.vuejs.org/) - 路由管理
- [Axios](https://axios-http.com/) - 封装请求，支持 Token 鉴权与无感刷新
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) - 代码规范
- [Husky](https://typicode.github.io/husky) + lint-staged - Git 提交检查
- 全局样式和 CSS 变量配置

## 📦 安装依赖

使用 `pnpm`（推荐）或 `npm` 安装依赖：

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```
🧩 启动开发环境
```bash
# 使用 pnpm
pnpm run dev

# 或使用 npm
npm run dev
```

## ✅ 特性介绍
- ✅ Axios 封装：支持 token 自动携带、刷新机制、错误处理统一

- ✅ 路由模块化：支持多级路由，权限控制可拓展

- ✅ 状态管理：使用 Pinia 替代 Vuex，模块划分清晰

- ✅ 代码规范：支持 ESLint + Prettier 格式化，Git 提交前自动检查

- ✅ 开发体验优秀：Vite 极速冷启动 + HMR 热更新