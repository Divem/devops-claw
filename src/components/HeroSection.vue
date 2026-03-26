<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">DevOps OpenClaw</h1>
      <p class="hero-subtitle">企业里的 AI 同事，随时在线，助你高效工作！</p>
    </div>
    <div class="hero-image">
      <img src="/images/mascot.png" alt="OpenClaw 吉祥物" />
    </div>
  </section>
</template>

<style lang="less" scoped>
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 24px;
}

.hero-title {
  font-size: 28px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 8px;
}

.hero-subtitle {
  font-size: 14px;
  color: @textColorPlaceholder;
}

.hero-image {
  width: 240px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
