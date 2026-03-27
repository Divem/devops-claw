import 'tailwindcss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

async function bootstrap() {
  if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCK) {
    try {
      const { worker } = await import('./mocks/browser')
      await worker.start({ onUnhandledRequest: 'bypass' })
    } catch (e) {
      console.warn('[MSW] Mock service worker 初始化失败，API 请求将直连后端:', e)
    }
  }

  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}

bootstrap()
