<template>
  <Teleport to="body">
    <Transition name="tips-fade">
      <div
        v-if="isVisible && currentTip"
        class="cursor-tips"
        :style="tipsStyle"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span class="tips-text">"{{ displayedText }}<span v-if="!isTyping">"</span></span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'

interface Props {
  isVisible: boolean
  currentTip: string
  position: { x: number; y: number }
}

const props = defineProps<Props>()

const displayedText = ref('')
const isTyping = ref(false)
let typewriterTimer: number | null = null

function startTypewriter(text: string) {
  if (typewriterTimer) clearInterval(typewriterTimer)
  displayedText.value = ''
  isTyping.value = true
  let index = 0
  typewriterTimer = window.setInterval(() => {
    if (index < text.length) {
      displayedText.value += text[index]
      index++
    } else {
      clearInterval(typewriterTimer!)
      typewriterTimer = null
      isTyping.value = false
    }
  }, 45)
}

watch(
  () => props.currentTip,
  (newTip) => {
    if (props.isVisible && newTip) startTypewriter(newTip)
  }
)

watch(
  () => props.isVisible,
  (visible) => {
    if (visible && props.currentTip) {
      startTypewriter(props.currentTip)
    } else if (!visible) {
      if (typewriterTimer) {
        clearInterval(typewriterTimer)
        typewriterTimer = null
      }
      displayedText.value = ''
      isTyping.value = false
    }
  }
)

onUnmounted(() => {
  if (typewriterTimer) clearInterval(typewriterTimer)
})

const tipsStyle = computed(() => ({
  transform: `translate(${props.position.x}px, ${props.position.y - 28}px)`
}))
</script>

<style lang="less" scoped>
.cursor-tips {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
}

.tips-text {
  font-size: 13px;
  color: rgba(40, 40, 40, 0.9);
  line-height: 1.4;
  white-space: nowrap;
  font-style: italic;
  font-weight: 600;
}

.tips-fade-enter-active,
.tips-fade-leave-active {
  transition: opacity 0.15s ease;
}

.tips-fade-enter-from,
.tips-fade-leave-to {
  opacity: 0;
}
</style>
