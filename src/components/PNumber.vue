<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { type PollingRef } from '../composables/pollingRef'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

const modelValue = defineModel<number>()
const {
  poll,
  label,
  tooltip,
  min,
  max,
  step = 1,
  readonly = false,
} = defineProps<{
  poll?: PollingRef<number>
  label?: string
  tooltip?: string
  min?: number
  max?: number
  step?: number
  readonly?: boolean
}>()

const model = usePollingOrModel(poll, modelValue)

const isDragging = ref(false)
const isFocused = ref(false)
const localValue = ref(String(model.value))
const dragPixelDelta = ref(0)

watch(model, (val) => {
  if (!isFocused.value) {
    localValue.value = String(val)
  }
})

function clamp(val: number): number {
  if (min !== undefined) val = Math.max(min, val)
  if (max !== undefined) val = Math.min(max, val)
  return val
}

function snapToStep(val: number): number {
  return Math.round(val / step) * step
}

const guideBodyPath = computed(() => {
  const x = dragPixelDelta.value
  return `M 0,4 L${x},4`
})

const guideHeadPath = computed(() => {
  const x = dragPixelDelta.value
  if (x === 0) return ''
  const aox = x + (x > 0 ? -1 : 1)
  const adx = Math.max(-4, Math.min(4, -aox))
  return `M ${aox + adx},0 L${aox},4 L${aox + adx},8 M ${x},-1 L${x},9`
})

const tooltipText = computed(() => {
  const decimals = step < 1 ? (String(step).split('.')[1]?.length ?? 0) : 0
  return model.value.toFixed(decimals)
})

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
  const parsed = parseFloat(localValue.value)
  if (!isNaN(parsed)) {
    model.value = clamp(parsed)
  } else {
    localValue.value = String(model.value)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    (e.target as HTMLInputElement).blur()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    const multiplier = e.shiftKey ? 10 : 1
    model.value = clamp(model.value + step * multiplier)
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    const multiplier = e.shiftKey ? 10 : 1
    model.value = clamp(model.value - step * multiplier)
  }
}

let dragStartX = 0
let dragStartValue = 0

function onKnobPointerDown(e: PointerEvent) {
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  isDragging.value = true
  dragStartX = e.clientX
  dragStartValue = model.value
  dragPixelDelta.value = 0
  document.body.style.cursor = 'ew-resize'
}

function onKnobPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  const delta = e.clientX - dragStartX
  dragPixelDelta.value = delta
  model.value = clamp(snapToStep(dragStartValue + delta))
}

function onKnobPointerUp() {
  isDragging.value = false
  dragPixelDelta.value = 0
  document.body.style.cursor = ''
}
</script>

<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <div
      class="vp-text vp-text--number"
      :class="{ 'vp-text--dragging': isDragging, 'vp-text--readonly': readonly }"
    >
      <input
        v-model="localValue"
        class="vp-text__input"
        type="text"
        :readonly="readonly"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      >
      <div
        v-if="!readonly"
        class="vp-text__knob"
        @pointerdown="onKnobPointerDown"
        @pointermove="onKnobPointerMove"
        @pointerup="onKnobPointerUp"
        @pointercancel="onKnobPointerUp"
      >
        <svg class="vp-text__guide">
          <path
            class="vp-text__guide-body"
            :d="guideBodyPath"
          />
          <path
            class="vp-text__guide-head"
            :d="guideHeadPath"
          />
        </svg>
        <div
          class="vp-text__drag-tooltip"
          :style="{ left: `${dragPixelDelta}px` }"
        >
          {{ tooltipText }}
        </div>
      </div>
    </div>
  </PLabel>
</template>

<style lang="scss">
@use '../styles/view/text';
@use '../styles/view/number';
</style>
