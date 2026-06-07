<script setup lang="ts">
import { flip, offset, shift, useFloating } from '@floating-ui/vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { ChromePicker, tinycolor } from 'vue-color'
import 'vue-color/style.css'
import PLabel from './PLabel.vue'

const model = defineModel<string>({ required: true })
const {
  label,
  tooltip,
  alpha = false,
} = defineProps<{
  label?: string
  tooltip?: string
  alpha?: boolean
}>()

const isOpen = ref(false)
const swatchRef = ref<HTMLElement | null>(null)
const pickerRef = ref<HTMLElement | null>(null)

const { floatingStyles } = useFloating(swatchRef, pickerRef, {
  placement: 'bottom-start',
  strategy: 'fixed',
  middleware: [offset(4), flip(), shift({ padding: 8 })],
})

function toggle() {
  isOpen.value = !isOpen.value
}

function onPickerChange(color: unknown) {
  const tc = tinycolor(color as Parameters<typeof tinycolor>[0])
  if (tc.isValid()) {
    model.value = alpha ? tc.toHex8String() : tc.toHexString()
  }
}

function onHexChange(e: Event) {
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
    <div class="vp-color">
      <div class="vp-color__header">
        <div
          ref="swatchRef"
          class="vp-color__swatch"
        >
          <button
            class="vp-color__swatch-btn"
            @click="toggle"
          >
            <div
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
