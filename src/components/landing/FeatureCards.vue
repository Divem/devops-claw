<template>
  <section class="features-section">
    <h2 class="section-title">好上手，超能干，更放心</h2>
    
    <div class="features-grid">
      <div class="feature-card" v-for="(feature, index) in features" :key="index">
        <div class="feature-icon">
          <img :src="feature.icon" :alt="feature.title" />
        </div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '/landing/icon-mouse.svg',
    title: '一键部署，所见即所得',
    description: '告别繁琐的环境搭建和配置流程。一键部署到云端，零配置接入即时通讯，打开就能用',
  },
  {
    icon: '/landing/icon-claw.svg',
    title: '原生体验，能力无损',
    description: '提供原版 OpenClaw 完整能力，独特个性、记忆、多 Agent 编排，内置官方集成插件。',
  },
  {
    icon: '/landing/icon-shield.svg',
    title: '企业级安全，数据不离场',
    description: '数据全程在企业内网流转，权限可控、授权透明、安全合规，放心用 AI。',
  },
]
</script>

<style lang="less" scoped>
.features-section {
  padding: 80px 24px;
  background-color: @bgWhite;
}

.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
  border-radius: 6px;
  padding: 40px 32px;
  text-align: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: 1px solid @borderColor;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 0px 8px 0px rgba(2, 2, 2, 0.1);
  }
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 12px;
  line-height: 1.4;
}

.feature-description {
  font-size: 14px;
  color: @textColorSecondary;
  line-height: 1.6;
}

// 响应式适配
@media (max-width: 1440px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .features-section {
    padding: 60px 20px;
  }
  
  .section-title {
    font-size: 24px;
    margin-bottom: 40px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .feature-card {
    padding: 32px 24px;
  }
}
</style>
