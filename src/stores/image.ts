import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type {
  Image,
  ImageFilters,
  ImageType,
  ImageStatus,
  CreateImageRequest,
  UpdateImageRequest,
} from '@/types/image'

export const useImageStore = defineStore('image', () => {
  const items = ref<Image[]>([])
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(10)
  const isLoading = ref(false)
  const selectedImage = ref<Image | null>(null)
  const drawerVisible = ref(false)

  const filters = reactive<ImageFilters>({
    search: '',
    status: [],
    type: [],
    sort: 'createdAt',
    order: 'desc',
  })

  async function fetchImages() {
    isLoading.value = true
    try {
      const params = new URLSearchParams()
      if (filters.search) params.set('search', filters.search)
      if (filters.status.length) params.set('status', filters.status.join(','))
      if (filters.type.length) params.set('type', filters.type.join(','))
      params.set('sort', filters.sort)
      params.set('order', filters.order)
      params.set('page', String(page.value))
      params.set('pageSize', String(pageSize.value))

      const res = await fetch(`/api/admin/images?${params}`)
      if (res.ok) {
        const data = await res.json()
        items.value = data.items
        total.value = data.total
      }
    } finally {
      isLoading.value = false
    }
  }

  async function createImage(data: CreateImageRequest): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        await fetchImages()
        return true
      }
      return false
    } catch {
      return false
    }
  }

  async function updateImage(id: string, data: UpdateImageRequest): Promise<boolean> {
    try {
      const res = await fetch(`/api/admin/images/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        await fetchImages()
        return true
      }
      return false
    } catch {
      return false
    }
  }

  async function deleteImage(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/admin/images/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        await fetchImages()
        return true
      }
      return false
    } catch {
      return false
    }
  }

  function showDetail(image: Image) {
    selectedImage.value = image
    drawerVisible.value = true
  }

  function closeDrawer() {
    drawerVisible.value = false
    selectedImage.value = null
  }

  function resetFilters() {
    filters.search = ''
    filters.status = [] as ImageStatus[]
    filters.type = [] as ImageType[]
    filters.sort = 'createdAt'
    filters.order = 'desc'
  }

  return {
    items,
    total,
    page,
    pageSize,
    isLoading,
    selectedImage,
    drawerVisible,
    filters,
    fetchImages,
    createImage,
    updateImage,
    deleteImage,
    showDetail,
    closeDrawer,
    resetFilters,
  }
})
