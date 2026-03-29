# AGENTS.md

Guidelines for AI agents working on DevOps OpenClaw — a Vue 3 + TypeScript enterprise platform for self-hosted OpenClaw with Feishu integration.

## Build Commands

```bash
# Development server
npm run dev

# Production build (includes type checking)
npm run build

# Preview production build
npm run preview
```

## Test Commands

```bash
# Run all tests
npx vitest run

# Run tests in watch mode
npx vitest

# Run single test file
npx vitest run tests/stores/project.test.ts

# Run tests matching pattern
npx vitest run --grep "initial state"
```

## Code Style

### TypeScript & Vue

- **Strict mode enabled**: `noUnusedLocals`, `noUnusedParameters`, `strict: true`
- Use Composition API with `<script setup lang="ts">`
- Define props with `defineProps<{ prop: Type }>()`
- Define emits with `defineEmits<{ event: [payload: Type] }>()`
- Use `type` for unions/strings, `interface` for objects
- Prefer explicit return types on exported functions

### Imports

```typescript
// Order: vue → third-party → @/ aliases → types
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { NButton } from 'naive-ui'
import { useProjectStore } from '@/stores/project'
import type { Project } from '@/types/project'

// Path alias: @/ maps to src/
```

### Naming Conventions

- **Components**: PascalCase (e.g., `CreateModal.vue`)
- **Composables**: camelCase with `use` prefix (e.g., `usePolling.ts`)
- **Stores**: camelCase with `use` prefix + Store suffix (e.g., `useProjectStore`)
- **Types/Interfaces**: PascalCase (e.g., `Project`, `StepStatus`)
- **Constants**: camelCase (e.g., `avatarList`, `mockUser`)
- **Variables**: camelCase (e.g., `isLoading`, `pageState`)
- **Boolean props**: Prefix with verb (e.g., `isValid`, `showModal`)

### Styling

- Use Less for scoped styles: `<style lang="less" scoped>`
- Global styles: `@import '@/assets/styles/global.less'`
- Variables defined in `@/assets/styles/variables.less`
- Tailwind v4 for utility classes
- Design tokens: Brand color `#006eff`, Tailwind primary `#0960bd`
- 完整设计规范参考: [docs/design-token.md](./docs/design-token.md)

### Error Handling

```typescript
// Use try/catch for async operations
try {
  const res = await fetch('/api/project')
  if (!res.ok) throw new Error()
  store.setProject(await res.json())
} catch {
  store.setEmpty() // Silent fallback preferred
}
```

### State Management (Pinia)

```typescript
// Use setup store pattern
export const useProjectStore = defineStore('project', () => {
  const state = ref<State>('initial')
  
  function updateState(newState: State) {
    state.value = newState
  }
  
  return { state, updateState }
})
```

## Testing Guidelines

- Framework: Vitest with happy-dom environment
- Location: `tests/**/*.test.ts`
- Pinia testing: `setActivePinia(createPinia())` in `beforeEach`
- Tests in Chinese (matching UI language)
- Use `data-testid` attributes for component selection

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProjectStore } from '@/stores/project'

describe('useProjectStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('初始状态为 loading', () => {
    const store = useProjectStore()
    expect(store.pageState).toBe('loading')
  })
})
```

## Project Structure

```
src/
  components/    # Vue SFCs (PascalCase)
  composables/   # Reusable logic (useXxx.ts)
  stores/        # Pinia stores (useXxxStore.ts)
  types/         # TypeScript types
  assets/        # Styles, images
  mocks/         # MSW mock data & handlers
tests/           # Test files (*.test.ts)
```

## Mock & 无后端部署

当前项目没有后端服务，所有 API 通过前端 mock 函数实现（`src/mocks/data.ts`、`src/mocks/adminData.ts`、`src/mocks/imageData.ts`）。

**硬性要求：所有新增 API 调用必须提供前端 mock 实现。**

- 新增 store 或组件中的数据获取，必须同步在 `src/mocks/` 中添加对应的 mock 函数
- 调用方式：直接 import mock 函数，不使用 `fetch('/api/...')`
- 认证模块已改为纯前端验证（用户名密码不为空即可登录）
- 部署环境为 nginx + HTTP，不支持 HTTPS，因此 MSW Service Worker 不可用

### Mock 文件结构

```
src/mocks/
  data.ts          # 员工端：项目 CRUD、进度、机器人配置、仪表盘
  adminData.ts     # 管理后台：实例管理、审批、用户搜索
  imageData.ts     # 镜像管理
  handlers.ts      # MSW handlers（仅 dev 模式使用，生产环境不生效）
  browser.ts       # MSW browser setup
```

## OpenSpec Workflow

Project uses OpenSpec for change management:
- `/opsx:propose` – Create change proposal
- `/opsx:apply` – Implement change
- `/opsx:archive` – Archive completed change
