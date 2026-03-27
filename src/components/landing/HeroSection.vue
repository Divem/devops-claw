<template>
  <section class="hero-section">
    <div class="hero-illustration">
      <img 
        src="/landing/hero-shrimps.png" 
        alt="DevOps Claw AI 智能助手" 
        class="shrimp-image"
        loading="eager"
      />
    </div>
    <div class="hero-content">
      <h1 class="hero-title">DevOps Claw</h1>
      <p class="hero-subtitle">
        原版 OpenClaw 的企业级部署方案。一键上云，能力无删减；有记忆、有个性，能以你的身份
        读 DevOps、做任务、排日程。数据不出企业，零配置接入——完整的 OpenClaw，安全地用。
      </p>
      <div class="hero-cta">
        <n-button
          type="primary"
          size="large"
          class="deploy-btn"
          @click="handleDeploy"
        >
          立即部署
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </template>
        </n-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'

const emit = defineEmits<{
  deploy: []
}>()

function handleDeploy() {
  emit('deploy')
}
</script>

<style lang="less" scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 60px 24px 80px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%);
}

.hero-illustration {
  margin-bottom: 40px;
  
  .shrimp-image {
    width: 520px;
    height: auto;
    max-width: 90vw;
  }
}

.hero-content {
  max-width: 680px;
}

.hero-title {
  font-size: 40px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 24px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 16px;
  color: @textColorSecondary;
  line-height: 1.8;
  margin-bottom: 40px;
}

.hero-cta {
  display: flex;
  justify-content: center;
}

.deploy-btn {
  min-width: 160px;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-radius: @radiusButton;
  
  :deep(.n-button__content) {
    gap: 8px;
  }
}

// 响应式适配
@media (max-width: 1024px) {
  .hero-section {
    padding: 40px 20px 60px;
  }
  
  .hero-illustration {
    margin-bottom: 24px;
    
    .shrimp-image {
      width: 280px;
    }
  }
  
  .hero-title {
    font-size: 32px;
    margin-bottom: 16px;
  }
  
  .hero-subtitle {
    font-size: 14px;
    margin-bottom: 32px;
  }
}
</style>
