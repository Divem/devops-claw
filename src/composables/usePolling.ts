import { ref, onUnmounted } from 'vue'

export function usePolling(
  callback: () => Promise<boolean>,
  interval: number,
) {
  const isPolling = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  async function poll() {
    if (!isPolling.value) return
    const shouldStop = await callback()
    if (shouldStop || !isPolling.value) {
      isPolling.value = false
      return
    }
    timer = setTimeout(poll, interval)
  }

  function start() {
    isPolling.value = true
    poll()
  }

  function stop() {
    isPolling.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  onUnmounted(stop)

  return { isPolling, start, stop }
}
