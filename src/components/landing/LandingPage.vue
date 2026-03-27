<template>
  <div class="landing-page">
    <!-- 顶部导航 -->
    <header class="landing-header">
      <div class="header-content">
        <div class="header-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#00D6B9"/>
            <path d="M2 17L12 22L22 17" stroke="#00D6B9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#00D6B9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="header-brand-name">DevOps Claw</span>
        </div>
        
        <nav class="header-nav">
          <a href="#" class="header-link">Claw 体验指南</a>
        </nav>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="landing-main">
      <HeroSection @deploy="handleDeploy" />
      <FeatureCards />
    </main>

    <!-- 页脚 -->
    <LandingFooter />
  </div>
</template>

<script setup lang="ts">
import HeroSection from './HeroSection.vue'
import FeatureCards from './FeatureCards.vue'
import LandingFooter from './LandingFooter.vue'

const emit = defineEmits<{
  startDeploy: []
}>()

function handleDeploy() {
  emit('startDeploy')
}
</script>

<style lang="less" scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
}

.landing-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid @borderColor;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: @headerHeight;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .header-brand-name {
    font-size: 16px;
    font-weight: 500;
    color: @textColorTitle;
  }
}

.header-nav {
  .header-link {
    font-size: 14px;
    color: #2d8cf0;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: #57a3f3;
    }
  }
}

.landing-main {
  flex: 1;
  padding-top: @headerHeight;
}

// 响应式适配
@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
  }
  
  .header-brand-name {
    display: none;
  }
}
</style>
