<template>
  <n-modal
    :show="show"
    :mask-closable="false"
    @update:show="(val: boolean) => !val && handleClose()"
  >
    <div class="create-modal">
      <div class="modal-header">
        <h2 class="modal-title">{{ isEdit ? '编辑镜像' : '新增镜像' }}</h2>
        <n-button quaternary circle size="small" class="modal-close" @click="handleClose">
          ✕
        </n-button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">镜像名称 <span class="required">*</span></label>
          <n-input
            v-model:value="form.name"
            placeholder="请输入镜像名称"
            :maxlength="50"
            show-count
            :disabled="submitting"
          />
        </div>

        <template v-if="!isEdit">
          <div class="form-group">
            <label class="form-label">镜像类型 <span class="required">*</span></label>
            <n-select
              v-model:value="form.type"
              :options="typeOptions"
              :disabled="submitting"
            />
          </div>

          <div class="form-group">
            <label class="form-label">镜像地址 <span class="required">*</span></label>
            <n-input
              v-model:value="form.imageUrl"
              placeholder="如: registry.example.com/openclaw:v1.4.2"
              :disabled="submitting"
            />
          </div>

          <div class="form-group">
            <label class="form-label">版本号 <span class="required">*</span></label>
            <n-input
              v-model:value="form.version"
              placeholder="如: v1.0.0、v2024.03"
              :disabled="submitting"
            />
          </div>

          <div class="form-group">
            <label class="form-label">大小 (MB)</label>
            <n-input-number
              v-model:value="form.size"
              placeholder="镜像大小"
              :min="0"
              :disabled="submitting"
              style="width: 100%"
            />
          </div>
        </template>

        <div class="form-group">
          <label class="form-label">描述</label>
          <n-input
            v-model:value="form.description"
            type="textarea"
            placeholder="请输入镜像描述（选填）"
            :rows="3"
            :maxlength="200"
            show-count
            :disabled="submitting"
          />
        </div>

        <n-alert v-if="errorMsg" type="error" :title="errorMsg" style="margin-top: 12px" />
      </div>

      <div class="modal-footer">
        <n-button size="medium" @click="handleClose">取消</n-button>
        <n-button
          type="primary"
          size="medium"
          :loading="submitting"
          :disabled="!isValid"
          @click="handleSubmit"
        >
          {{ isEdit ? '保存' : '创建' }}
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { NModal, NInput, NInputNumber, NSelect, NButton, NAlert } from 'naive-ui'
import type { Image, ImageType } from '@/types/image'
import { useImageStore } from '@/stores/image'

const props = defineProps<{
  show: boolean
  editImage?: Image | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  success: []
}>()

const imageStore = useImageStore()
const submitting = ref(false)
const errorMsg = ref('')

const typeOptions = [
  { label: '虚拟机镜像', value: 'vm' },
  { label: 'OpenClaw 镜像', value: 'openclaw' },
]

const isEdit = computed(() => !!props.editImage)

const form = reactive({
  type: 'vm' as ImageType,
  name: '',
  imageUrl: '',
  version: '',
  description: '',
  size: null as number | null,
})

watch(() => props.show, (newVal) => {
  if (newVal) {
    errorMsg.value = ''
    if (props.editImage) {
      form.type = props.editImage.type
      form.name = props.editImage.name
      form.imageUrl = props.editImage.imageUrl
      form.version = props.editImage.version
      form.description = props.editImage.description
      form.size = props.editImage.size
    } else {
      form.type = 'vm'
      form.name = ''
      form.imageUrl = ''
      form.version = ''
      form.description = ''
      form.size = null
    }
  }
})

const isValid = computed(() => {
  if (!form.name.trim()) return false
  if (!isEdit.value) {
    if (!form.imageUrl.trim()) return false
    if (!form.version.trim()) return false
  }
  return true
})

async function handleSubmit() {
  if (!isValid.value) return
  submitting.value = true
  errorMsg.value = ''

  let ok: boolean
  if (isEdit.value && props.editImage) {
    ok = await imageStore.updateImage(props.editImage.id, {
      name: form.name.trim(),
      description: form.description.trim(),
    })
  } else {
    ok = await imageStore.createImage({
      type: form.type,
      name: form.name.trim(),
      imageUrl: form.imageUrl.trim(),
      version: form.version.trim(),
      description: form.description.trim() || undefined,
      size: form.size ?? undefined,
    })
  }

  submitting.value = false

  if (ok) {
    emit('success')
    handleClose()
  } else {
    errorMsg.value = isEdit.value ? '保存失败，请稍后重试' : '创建失败，请稍后重试'
  }
}

function handleClose() {
  emit('update:show', false)
}
</script>

<style lang="less" scoped>
.create-modal {
  background: @bgWhite;
  border-radius: @radiusModal;
  padding: 24px;
  width: 480px;
  max-width: 90vw;
  position: relative;
}

.modal-header {
  margin-bottom: 20px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: @textColorTitle;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
}

.modal-body {
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: @textColorTitle;
  margin-bottom: 8px;
  display: block;
}

.required {
  color: @errorColor;
}
</style>
