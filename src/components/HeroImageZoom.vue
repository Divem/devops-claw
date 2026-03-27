<template>
  <img
    :src="src"
    :alt="alt"
    class="hero-image-zoom"
    loading="eager"
  />
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
}

defineProps<Props>()
</script>

<style lang="less" scoped>
.hero-image-zoom {
  display: inline-block;
  width: 100%;
  height: auto;
}
</style>
