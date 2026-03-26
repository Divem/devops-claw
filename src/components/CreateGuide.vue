<template>
  <div class="create-guide">
    <div class="guide-left">
      <span class="guide-icon">🔧</span>
      <div class="guide-text">
        <h3 class="guide-title">创建 DevOps OpenClaw</h3>
        <p class="guide-desc">一键云端部署，自动接入飞书机器人</p>
      </div>
    </div>
    <n-button type="primary" size="large" @click="emit('create')">
      创建
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'

const emit = defineEmits<{
  create: []
}>()
</script>

<style lang="less" scoped>
.create-guide {
  width: 100%;
  max-width: 800px;
  background: @bgWhite;
  border-radius: @radiusCard;
  box-shadow: @shadowCard;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.guide-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.guide-icon {
  font-size: 24px;
}

.guide-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.guide-desc {
  font-size: 12px;
  color: @textColorPlaceholder;
  margin-top: 2px;
}
</style>
