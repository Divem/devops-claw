<template>
  <div class="landing-page">
    <!-- 顶部导航 -->
    <header ref="headerRef" class="landing-header">
      <div class="header-content">
        <div class="header-brand">
          <span class="header-brand-logo">🦞</span>
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
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  startDeploy: []
}>()

const headerRef = ref<HTMLElement>()

function handleDeploy() {
  emit('startDeploy')
}

function onScroll() {
  headerRef.value?.classList.toggle('is-scrolled', window.scrollY > 60)
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
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
  background: transparent;
  transition: background 0.3s ease;

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

  .header-brand-logo {
    font-size: 20px;
    line-height: 1;
  }

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
