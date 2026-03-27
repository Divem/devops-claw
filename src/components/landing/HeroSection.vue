<template>
  <section class="hero-section">
    <div class="hero-illustration">
      <HeroImageZoom
        src="/landing/hero-shrimps.png"
        alt="DevOps Claw AI 智能助手"
        class="shrimp-image"
      />
    </div>

    <CursorTips
      :is-visible="tipsState.isVisible"
      :current-tip="tipsState.currentTip"
      :position="tipsState.position"
    />

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
import HeroImageZoom from '../HeroImageZoom.vue'
import CursorTips from '../CursorTips.vue'
import { useCursorTips } from '../../composables/useCursorTips'

const emit = defineEmits<{
  deploy: []
}>()

// Tips 内容 — 小龙虾风格
const heroTips = [
  '终于不用折腾环境啦，一键安装太省心～',
  '解压即用，告别繁琐配置，快乐起飞！',
  '找了好久的纯净版，这下完美搞定 ✨',
  '小白也能轻松上手，全程零操作压力',
  'OpenClaw 官方纯净版，安全无捆绑',
  '一键部署，全平台兼容，开箱即用',
  '极速安装 + 稳定运行，体验拉满',
  '内置优化配置，无需手动调试',
  '小龙虾探头：主人快带我回家～',
  '钳钳发力，帮你一键装好 OpenClaw！'
]

const { state: tipsState } = useCursorTips({
  tips: heroTips,
  scrollPauseDelay: 1500,
  switchInterval: 3000,
  containerSelector: '.hero-section'
})

function handleDeploy() {
  emit('deploy')
}
</script>

<style lang="less" scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: 60px 24px 80px;
  background:
    linear-gradient(
      170deg,
      #ffffff 0%,
      #f0f5ff 40%,
      #e8effe 70%,
      #f7f7f7 100%
    );
  overflow: visible;
  position: relative;

  // 光晕效果层
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    width: 140%;
    height: 60%;
    background:
      radial-gradient(
        ellipse 70% 100% at 50% 100%,
        rgba(0, 110, 255, 0.14) 0%,
        rgba(0, 110, 255, 0.06) 30%,
        rgba(0, 110, 255, 0.02) 50%,
        transparent 70%
      ),
      radial-gradient(
        ellipse 40% 60% at 50% 100%,
        rgba(0, 140, 255, 0.18) 0%,
        rgba(100, 180, 255, 0.08) 40%,
        transparent 65%
      );
    pointer-events: none;
    z-index: 0;
    filter: blur(30px);
  }

  // 底部过渡
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(to top, #f7f7f7, transparent);
    pointer-events: none;
    z-index: 1;
  }
}

@keyframes hero-float-in {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes hero-content-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-illustration {
  position: relative;
  margin-bottom: 40px;
  z-index: 2;

  .shrimp-image {
    width: clamp(520px, 65vw, 800px);
    height: auto;
    max-width: 90vw;
    animation: hero-float-in 800ms ease-out both;
  }
}

.hero-content {
  max-width: 680px;
  z-index: 2;
}

.hero-title {
  font-size: 40px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 24px;
  line-height: 1.2;
  animation: hero-content-fade 600ms ease-out 300ms both;
}

.hero-subtitle {
  font-size: 16px;
  color: @textColorSecondary;
  line-height: 1.8;
  margin-bottom: 40px;
  animation: hero-content-fade 600ms ease-out 450ms both;
}

.hero-cta {
  display: flex;
  justify-content: center;
  animation: hero-content-fade 600ms ease-out 600ms both;
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

// 无障碍：禁用入场动画
@media (prefers-reduced-motion: reduce) {
  .hero-illustration .shrimp-image,
  .hero-title,
  .hero-subtitle,
  .hero-cta {
    animation: none;
  }
}
</style>
