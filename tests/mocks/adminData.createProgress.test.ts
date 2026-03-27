import { describe, it, expect, beforeEach } from 'vitest'
import { getInstanceCreateProgress, resetInstanceCreateProgress } from '@/mocks/adminData'

describe('getInstanceCreateProgress', () => {
  const id = 'test-inst-progress'

  beforeEach(() => {
    resetInstanceCreateProgress(id)
  })

  describe('有 AppID 时', () => {
    it('第1次轮询：vm running，其余 pending', () => {
      const p = getInstanceCreateProgress(id, true)
      expect(p.done).toBe(false)
      expect(p.steps[0].status).toBe('running') // vm
      expect(p.steps[1].status).toBe('pending') // openclaw
      expect(p.steps[2].status).toBe('pending') // feishu
    })

    it('第2次轮询：vm done，openclaw running', () => {
      getInstanceCreateProgress(id, true)
      const p = getInstanceCreateProgress(id, true)
      expect(p.steps[0].status).toBe('done')
      expect(p.steps[1].status).toBe('running')
      expect(p.done).toBe(false)
    })

    it('第5次轮询：全部完成，done=true', () => {
      for (let i = 0; i < 4; i++) getInstanceCreateProgress(id, true)
      const p = getInstanceCreateProgress(id, true)
      expect(p.done).toBe(true)
      expect(p.steps.every((s) => s.status === 'done')).toBe(true)
      expect(p.steps[2].note).toBeUndefined()
    })
  })

  describe('无 AppID 时', () => {
    it('第4次轮询：全部完成，飞书步骤带「待配置」note，done=true', () => {
      for (let i = 0; i < 3; i++) getInstanceCreateProgress(id, false)
      const p = getInstanceCreateProgress(id, false)
      expect(p.done).toBe(true)
      expect(p.steps[2].status).toBe('done')
      expect(p.steps[2].note).toBe('待配置')
    })
  })
})
