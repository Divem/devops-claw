import { describe, it, expect } from 'vitest'

// 验证函数实现（从组件中提取用于测试）
function validateAppId(appId: string): string | null {
  if (!appId.trim()) {
    return 'App ID 不能为空'
  }
  // Feishu App ID 通常以 cli_ 开头
  if (!appId.match(/^cli_[a-zA-Z0-9]+$/)) {
    return 'App ID 格式不正确，应以 cli_ 开头'
  }
  return null
}

function validateSecret(secret: string): string | null {
  if (!secret.trim()) {
    return 'App Secret 不能为空'
  }
  if (secret.length < 8) {
    return 'App Secret 长度不能少于 8 位'
  }
  return null
}

describe('validateAppId', () => {
  it('空字符串应该返回错误', () => {
    const result = validateAppId('')
    expect(result).toBe('App ID 不能为空')
  })

  it('只有空格的字符串应该返回错误', () => {
    const result = validateAppId('   ')
    expect(result).toBe('App ID 不能为空')
  })

  it('不以 cli_ 开头的 ID 应该返回错误', () => {
    const result = validateAppId('invalid_id')
    expect(result).toBe('App ID 格式不正确，应以 cli_ 开头')
  })

  it('cli_ 开头但包含特殊字符的 ID 应该返回错误', () => {
    const result = validateAppId('cli_invalid-id!')
    expect(result).toBe('App ID 格式不正确，应以 cli_ 开头')
  })

  it('有效的 cli_ 格式 ID 应该返回 null', () => {
    const result = validateAppId('cli_abc123')
    expect(result).toBeNull()
  })

  it('cli_ 后跟大写字母的 ID 应该返回 null', () => {
    const result = validateAppId('cli_ABC123')
    expect(result).toBeNull()
  })

  it('cli_ 后跟数字的 ID 应该返回 null', () => {
    const result = validateAppId('cli_123456')
    expect(result).toBeNull()
  })

  it('cli_ 后跟混合字符的 ID 应该返回 null', () => {
    const result = validateAppId('cli_aBc123XyZ')
    expect(result).toBeNull()
  })

  it('只有 cli_ 应该返回错误', () => {
    const result = validateAppId('cli_')
    expect(result).toBe('App ID 格式不正确，应以 cli_ 开头')
  })
})

describe('validateSecret', () => {
  it('空字符串应该返回错误', () => {
    const result = validateSecret('')
    expect(result).toBe('App Secret 不能为空')
  })

  it('只有空格的字符串应该返回错误', () => {
    const result = validateSecret('   ')
    expect(result).toBe('App Secret 不能为空')
  })

  it('少于 8 个字符的 secret 应该返回错误', () => {
    const result = validateSecret('short')
    expect(result).toBe('App Secret 长度不能少于 8 位')
  })

  it('正好 8 个字符的 secret 应该返回 null', () => {
    const result = validateSecret('12345678')
    expect(result).toBeNull()
  })

  it('超过 8 个字符的 secret 应该返回 null', () => {
    const result = validateSecret('this_is_a_valid_secret')
    expect(result).toBeNull()
  })

  it('包含特殊字符的 secret 应该返回 null', () => {
    const result = validateSecret('secret!@#$%^*()')
    expect(result).toBeNull()
  })

  it('包含空格的 secret（总长度≥8）应该返回 null', () => {
    const result = validateSecret('secret 123')
    expect(result).toBeNull()
  })
})
