<script setup lang="ts">
import { ref, watch } from 'vue'
import PLabel from './PLabel.vue'

const model = defineModel<number>({ required: true })
const {
  label,
  tooltip,
  min,
  max,
  step = 1,
} = defineProps<{
  label?: string
  tooltip?: string
  min?: number
  max?: number
  step?: number
}>()

const isDragging = ref(false)
const isFocused = ref(false)
const localValue = ref(String(model.value))

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

let dragStartY = 0
let dragStartValue = 0

function onKnobPointerDown(e: PointerEvent) {
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  isDragging.value = true
  dragStartY = e.clientY
  dragStartValue = model.value
}

function onKnobPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  const delta = dragStartY - e.clientY
  model.value = clamp(dragStartValue + delta * step)
}

function onKnobPointerUp() {
  isDragging.value = false
}
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <div
      class="vp-text vp-text--number"
      :class="{ 'vp-text--dragging': isDragging }"
    >
      <input
        v-model="localValue"
        class="vp-text__input"
        type="text"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      >
      <div
        class="vp-text__knob"
        @pointerdown="onKnobPointerDown"
        @pointermove="onKnobPointerMove"
        @pointerup="onKnobPointerUp"
        @pointercancel="onKnobPointerUp"
      />
    </div>
  </PLabel>
</template>
<style lang="scss">
@use '../styles/view/text';
@use '../styles/view/number';
</style>
