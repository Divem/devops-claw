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

## Mock Service Worker

MSW configured for development. Mock handlers in `src/mocks/`. Worker auto-starts in dev mode via `main.ts`.

## OpenSpec Workflow

Project uses OpenSpec for change management:
- `/opsx:propose` – Create change proposal
- `/opsx:apply` – Implement change
- `/opsx:archive` – Archive completed change
