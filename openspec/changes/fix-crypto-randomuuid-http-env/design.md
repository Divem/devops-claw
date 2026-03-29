## Context

当前 mock 数据层使用 `crypto.randomUUID()` 生成项目唯一标识符。该 API 是 Web Crypto API 的一部分，根据规范仅在安全上下文（Secure Context）中可用：

- ✅ **安全上下文**: `https://*` 或 `http://localhost` / `http://127.0.0.1`
- ❌ **非安全上下文**: `http://<ip>:<port>`（如 `http://10.245.13.68:8082`）

在生产环境部署时，用户通过 IP 地址访问 nginx HTTP 服务，导致 `crypto.randomUUID()` 抛出异常，项目创建失败。

## Goals / Non-Goals

**Goals:**
- 实现一个在所有 HTTP/HTTPS 环境下都能正常工作的 UUID 生成方案
- 保持生成的 ID 具有足够的唯一性（时间戳 + 随机数组合）
- 最小化代码变更，仅修改 `src/mocks/data.ts` 中的 `createProject` 函数

**Non-Goals:**
- 不引入额外的 UUID 库依赖（如 `uuid` npm 包）
- 不改变项目 ID 的数据格式（仍为字符串）
- 不影响其他 mock 数据生成逻辑

## Decisions

### 方案选择：自定义 ID 生成函数

**实现**: 
```typescript
function generateProjectId(): string {
  return 'proj_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9)
}
```

**理由**:
- **简单**: 无需引入外部依赖
- **兼容**: 纯 JavaScript，在所有浏览器环境中可用
- **唯一性**: 时间戳（毫秒级）+ 9位随机字符串，碰撞概率极低
- **可读**: `proj_` 前缀便于调试时识别

**替代方案**: 使用 `uuid` npm 库
- 否决原因：为单个简单功能引入依赖不值得，增加打包体积

## Risks / Trade-offs

- **[风险] 时间戳 + 随机数的唯一性不如 UUID v4** → **缓解**: mock 数据仅用于演示，实际碰撞概率在毫秒级时间戳下可忽略
- **[风险] 现有项目中使用 `crypto.randomUUID()` 的地方可能不止一处** → **缓解**: 全局搜索确认仅 `createProject` 使用
