# HitPaw AI Tools - Developer Guide

## Core Tech Stack
- **Framework**: Nuxt 3 (SSR enabled)
- **Styling**: Tailwind CSS
- **Runtime**: Node.js
- **State Management**: Pinia
- **Components**: Functional, modular Vue components using Composition API (`<script setup>`).

## Coding Standards
1. **Model Preference**: All complex logic and code generation should be optimized for **OpenAI Codex/GPT-4o** compatibility.
2. **Directory Structure**:
   - `components/nexus/`: All Nexus-related UI components.
   - `composables/`: Logic for context detection and workspace launching.
   - `server/api/nexus/`: Nitro server routes.
3. **Type Safety**: Use TypeScript for all composables and API definitions.
4. **Git Flow**:
   - Always work on feature branches (e.g., `feat/nexus-init`).
   - Atomic commits with clear descriptions.

## 4. 强制自检与部署流程 (Strict CI/CD Protocol)
任何功能迭代或 Bug 修复必须遵循以下自检流程，严禁未经测试直接推送：

1.  **本地构建测试**：在推送前，必须在本地 workspace 成功执行 `npm run build`。如果构建失败，严禁推送。
2.  **依赖冲突检查**：新增依赖后，必须执行 `npm install` 确认依赖树无冲突。
3.  **代码风格检查**：确保没有未使用的变量 or 明显的逻辑错误（针对 OpenAI Codex 优化）。
4.  **原子提交**：Commit message 必须清晰，且一个分支只解决一个问题。

## 5. 错误处理规范
- 如果遇到环境相关的报错（如依赖冲突），必须先在本地通过 `--force` 或版本锁定解决，并同步更新 `package.json`，严禁让服务器去猜测版本。
- 严禁提交 `node_modules` 或 `.output` 等构建产物。
