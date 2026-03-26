<template>
  <section class="feature-list">
    <div v-for="feature in features" :key="feature.title" class="feature-item">
      <span class="feature-icon">{{ feature.icon }}</span>
      <div class="feature-text">
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-desc">{{ feature.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    icon: '🚀',
    title: '一键部署，开箱即用',
    desc: '告别繁琐的环境搭建和配置流程，一键云端部署，零配置接入飞书，打开就能对话。',
  },
  {
    icon: '⭐',
    title: '原生体验，能力无损',
    desc: '提供原版 OpenClaw 完整能力，独特个性、长期记忆、内置飞书官方插件。',
  },
  {
    icon: '🛡️',
    title: '企业级安全，数据不离场',
    desc: '数据全程在企业体系内流转，权限可控，授权透明，安全合规，放心用 AI。',
  },
]
</script>

<style lang="less" scoped>
.feature-list {
  width: 100%;
  max-width: 800px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
}

.feature-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-title {
  font-size: 14px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 14px;
  color: @textColorPlaceholder;
  line-height: 1.5;
}
</style>
