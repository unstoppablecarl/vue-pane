<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { type PollingRef } from '../composables/pollingRef'
import { usePickerFold } from '../composables/usePickerFold'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

type Polling = {
  poll: PollingRef<{ x: number, y: number }>
  modelValue?: never
}
type Model = {
  poll?: never
  modelValue?: { x: number, y: number }
}

type Props = {
  label?: string
  tooltip?: string
  min?: number
  max?: number
  readonly?: boolean
  disabled?: boolean
} & (Polling | Model)

const {
  label,
  tooltip,
  readonly,
  disabled,
  poll,
  modelValue,
  min = -1,
  max = 1,
} = defineProps<Props>()

const emit = defineEmits<{ 'update:modelValue': [{ x: number, y: number }] }>()

const modelRef = computed<{ x: number, y: number } | undefined>({
  get: () => modelValue,
  set: (val: any) => emit('update:modelValue', val!),
})

const model = usePollingOrModel(poll, modelRef)

const isOpen = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const isComplete = usePickerFold(panelRef, isOpen)
const canvasSize = 160

const localX = computed(() => model.value.x.toFixed(3))
const localY = computed(() => model.value.y.toFixed(3))

function clamp(val: number): number {
  return Math.max(min, Math.min(max, val))
}

function onXBlur(e: Event) {
  if (readonly || disabled) return
  const val = parseFloat((e.target as HTMLInputElement).value)
  if (!isNaN(val)) model.value = { x: clamp(val), y: model.value.y }
}

function onYBlur(e: Event) {
  if (readonly || disabled) return
  const val = parseFloat((e.target as HTMLInputElement).value)
  if (!isNaN(val)) model.value = { x: model.value.x, y: clamp(val) }
}

function toggle() {
  if (readonly || disabled) return
  isOpen.value = !isOpen.value
}

function drawCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  const size = canvasSize
  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = 'rgba(0,0,0,0.3)'
  ctx.fillRect(0, 0, size, size)
  ctx.strokeStyle = 'rgba(255,255,255,0.1)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(size / 2, 0)
  ctx.lineTo(size / 2, size)
  ctx.moveTo(0, size / 2)
  ctx.lineTo(size, size / 2)
  ctx.stroke()
}

onMounted(() => {
  drawCanvas()
})

const crosshairX = computed(() => {
  const range = max - min
  return ((model.value.x - min) / range) * canvasSize
})

const crosshairY = computed(() => {
  const range = max - min
  return canvasSize - ((model.value.y - min) / range) * canvasSize
})

let canvasDragging = false

function posToValue(e: PointerEvent) {
  const canvas = canvasRef.value!
  const rect = canvas.getBoundingClientRect()
  const rx = (e.clientX - rect.left) / rect.width
  const ry = 1 - (e.clientY - rect.top) / rect.height
  const range = max - min
  return {
    x: clamp(min + rx * range),
    y: clamp(min + ry * range),
  }
}

function onCanvasDown(e: PointerEvent) {
  if (readonly || disabled) return
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  canvasDragging = true
  model.value = posToValue(e)
}

function onCanvasMove(e: PointerEvent) {
  if (readonly || disabled || !canvasDragging) return
  model.value = posToValue(e)
}

function onCanvasUp() {
  canvasDragging = false
}
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
      class="vp-point-2d"
      :class="{ 'vp-point-2d--expanded': isOpen, 'vp-point-2d--complete': isComplete, 'vp-point-2d--readonly': readonly, 'vp--disabled': disabled }"
    >
      <div class="vp-point-2d__header">
        <button
          class="vp-point-2d__btn"
          @click="toggle"
        >
          <svg viewBox="0 0 16 16">
            <path d="M8 2 L8 14 M2 8 L14 8" />
            <circle
              cx="8"
              cy="8"
              r="1.5"
            />
          </svg>
        </button>
        <div class="vp-point-2d__inputs">
          <div style="display:flex; gap:2px">
            <div
              class="vp-text vp-text--number vp-text--first"
              :class="{ 'vp-text--readonly': readonly }"
              style="flex:1"
            >
              <input
                class="vp-text__input"
                type="text"
                :value="localX"
                :readonly="readonly"
                :disabled="disabled"
                @blur="onXBlur"
                @keydown.enter="(e) => (e.target as HTMLElement).blur()"
              >
            </div>
            <div
              class="vp-text vp-text--number vp-text--last"
              :class="{ 'vp-text--readonly': readonly }"
              style="flex:1"
            >
              <input
                class="vp-text__input"
                type="text"
                :value="localY"
                :readonly="readonly"
                :disabled="disabled"
                @blur="onYBlur"
                @keydown.enter="(e) => (e.target as HTMLElement).blur()"
              >
            </div>
          </div>
        </div>
      </div>
      <div
        ref="panelRef"
        class="vp-point-2d__picker-panel"
      >
        <div class="vp-point-2d__picker-wrap">
          <canvas
            ref="canvasRef"
            class="vp-point-2d__canvas"
            :height="canvasSize"
            :width="canvasSize"
            @pointerdown="onCanvasDown"
            @pointermove="onCanvasMove"
            @pointerup="onCanvasUp"
            @pointercancel="onCanvasUp"
          />
          <div
            class="vp-point-2d__crosshair-h"
            :style="{ top: crosshairY + 'px' }"
          />
          <div
            class="vp-point-2d__crosshair-v"
            :style="{ left: crosshairX + 'px' }"
          />
        </div>
      </div>
    </div>
  </PLabel>
</template>
<style lang="scss">
@use '../styles/view/point-2d';
</style>
