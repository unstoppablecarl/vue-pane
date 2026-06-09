<script setup lang="ts">
import { computed, ref } from 'vue'
import { type PollingRef } from '../composables/pollingRef'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

const modelValue = defineModel<number>()
const {
  poll,
  label,
  tooltip,
  min = 0,
  max = 1,
  step = null,
  readonly = false,
} = defineProps<{
  poll?: PollingRef<number>
  label?: string
  tooltip?: string
  min?: number
  max?: number
  step?: number | null
  readonly?: boolean
}>()

const model = usePollingOrModel(poll, modelValue)

const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const knobPercent = computed(() => {
  const range = max - min
  if (range === 0) return 0
  return ((model.value - min) / range) * 100
})

function clamp(val: number): number {
  return Math.max(min, Math.min(max, val))
}

function valueFromPointer(e: PointerEvent): number {
  const el = trackRef.value
  if (!el) return model.value
  const rect = el.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  const raw = min + ratio * (max - min)
  if (step === null) return clamp(raw)
  return clamp(Math.round(raw / step) * step)
}

function onTrackPointerDown(e: PointerEvent) {
  if (readonly) return
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  isDragging.value = true
  model.value = valueFromPointer(e)
}

function onTrackPointerMove(e: PointerEvent) {
  if (readonly || !isDragging.value) return
  model.value = valueFromPointer(e)
}

function onPointerUp() {
  isDragging.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (readonly) return
  const increment = step ?? (max - min) / 100
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    e.preventDefault()
    model.value = clamp(model.value + increment * (e.shiftKey ? 10 : 1))
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    e.preventDefault()
    model.value = clamp(model.value - increment * (e.shiftKey ? 10 : 1))
  }
}
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <div
      class="vp-slider"
      :class="{ 'vp-slider--readonly': readonly }"
    >
      <div
        ref="trackRef"
        class="vp-slider__track"
        tabindex="0"
        @pointerdown="onTrackPointerDown"
        @pointermove="onTrackPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @keydown="onKeydown"
      >
        <div
          class="vp-slider__knob"
          :style="{ left: knobPercent + '%' }"
        />
      </div>
    </div>
  </PLabel>
</template>
<style lang="scss">
@use '../styles/view/slider';
</style>
