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
import {
  getImages,
  createImage as mockCreateImage,
  updateImage as mockUpdateImage,
  deleteImage as mockDeleteImage,
} from '@/mocks/imageData'

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
      const data = getImages({
        search: filters.search || undefined,
        status: filters.status.length ? filters.status.join(',') : undefined,
        type: filters.type.length ? filters.type.join(',') : undefined,
        sort: filters.sort,
        order: filters.order,
        page: page.value,
        pageSize: pageSize.value,
      })
      items.value = data.items
      total.value = data.total
    } finally {
      isLoading.value = false
    }
  }

  async function createImage(data: CreateImageRequest): Promise<boolean> {
    try {
      mockCreateImage({ ...data, imageUrl: data.imageUrl || `https://example.com/${data.name}-${data.version}.qcow2` })
      await fetchImages()
      return true
    } catch {
      return false
    }
  }

  async function updateImage(id: string, data: UpdateImageRequest): Promise<boolean> {
    try {
      const result = mockUpdateImage(id, data)
      if (result) {
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
      const result = mockDeleteImage(id)
      if (result) {
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
