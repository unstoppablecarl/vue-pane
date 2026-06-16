<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { flip, offset, shift, useFloating } from '@floating-ui/vue'
import { ChromePicker, tinycolor } from 'vue-color'
import 'vue-color/style.css'
import { type PollingRef } from '../composables/pollingRef'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

type Polling = {
  poll: PollingRef<string>
  modelValue?: never
}
type Model = {
  poll?: never
  modelValue?: string
}

type Props = {
  label?: string
  tooltip?: string
  alpha?: boolean
  readonly?: boolean
  disabled?: boolean
} & (Polling | Model)

const {
  label,
  tooltip,
  alpha = false,
  readonly = false,
  disabled = false,
  poll,
  modelValue,
} = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const modelRef = computed<string | undefined>({
  get: () => modelValue,
  set: (val: string | undefined) => emit('update:modelValue', val!),
})

const model = usePollingOrModel(poll, modelRef)

const isOpen = ref(false)
const swatchRef = ref<HTMLElement | null>(null)
const pickerRef = ref<HTMLElement | null>(null)

const { floatingStyles } = useFloating(swatchRef, pickerRef, {
  placement: 'bottom-start',
  strategy: 'fixed',
  middleware: [offset(4), flip(), shift({ padding: 8 })],
})

function toggle() {
  if (readonly || disabled) return
  isOpen.value = !isOpen.value
}

function onPickerChange(color: unknown) {
  if (readonly || disabled) return
  const tc = tinycolor(color as Parameters<typeof tinycolor>[0])
  if (tc.isValid()) {
    model.value = alpha ? tc.toHex8String() : tc.toHexString()
  }
}

function onHexChange(e: Event) {
  if (readonly || disabled) return
  const val = (e.target as HTMLInputElement).value
  const tc = tinycolor(val)
  if (tc.isValid()) {
    model.value = alpha ? tc.toHex8String() : tc.toHexString()
  }
}

function onPointerDown(e: PointerEvent) {
  if (!isOpen.value) return
  const target = e.target as Node
  if (swatchRef.value?.contains(target) || pickerRef.value?.contains(target)) return
  isOpen.value = false
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onUnmounted(() => document.removeEventListener('pointerdown', onPointerDown))
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <template #tooltip>
      <slot name="tooltip" />
    </template>
    <div
      class="vp-color"
      :class="{
        'vp-color--readonly': readonly,
        'vp--disabled': disabled,
      }"
    >
      <div class="vp-color__header">
        <div
          ref="swatchRef"
          class="vp-color__swatch"
        >
          <button
            class="vp-color__swatch-btn"
            @click="toggle"
          >
            <span
              class="vp-color__swatch-btn__color"
              :style="{ background: model }"
            />
          </button>
        </div>
        <div class="vp-color__text">
          <input
            class="vp-text__input"
            type="text"
            :value="model"
            :readonly="readonly"
            @change="onHexChange"
          >
        </div>
      </div>
      <Teleport to="body">
        <div
          v-if="isOpen"
          ref="pickerRef"
          class="vp-color__popup"
          :style="floatingStyles"
        >
          <ChromePicker
            :model-value="model"
            :disable-alpha="!alpha"
            @update:model-value="onPickerChange"
          />
        </div>
      </Teleport>
    </div>
  </PLabel>
</template>
<style lang="scss">
@use '../styles/view/color';
</style>
