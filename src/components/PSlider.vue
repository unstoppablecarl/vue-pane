<script setup lang="ts">
import { computed, ref } from 'vue'
import { type PollingRef } from '../composables/pollingRef'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

type Polling = {
  poll: PollingRef<number>
  modelValue?: never
}
type Model = {
  poll?: never
  modelValue?: number
}

type Props = {
  label?: string
  tooltip?: string
  min?: number
  max?: number
  step?: number | null
  readonly?: boolean
} & (Polling | Model)

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 1,
  step: null,
})
const emit = defineEmits<{ 'update:modelValue': [number] }>()

const modelRef = computed<number | undefined>({
  get: () => props.modelValue,
  set: (val: number | undefined) => emit('update:modelValue', val!),
})

const model = usePollingOrModel(props.poll, modelRef)

const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const knobPercent = computed(() => {
  const range = props.max - props.min
  if (range === 0) return 0
  return ((model.value - props.min) / range) * 100
})

function clamp(val: number): number {
  return Math.max(props.min, Math.min(props.max, val))
}

function valueFromPointer(e: PointerEvent): number {
  const el = trackRef.value
  if (!el) return model.value
  const rect = el.getBoundingClientRect()
  const ratio = (e.clientX - rect.left) / rect.width
  const raw = props.min + ratio * (props.max - props.min)
  if (props.step === null) return clamp(raw)
  return clamp(Math.round(raw / props.step) * props.step)
}

function onTrackPointerDown(e: PointerEvent) {
  if (props.readonly) return
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  isDragging.value = true
  model.value = valueFromPointer(e)
}

function onTrackPointerMove(e: PointerEvent) {
  if (props.readonly || !isDragging.value) return
  model.value = valueFromPointer(e)
}

function onPointerUp() {
  isDragging.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (props.readonly) return
  const increment = props.step ?? (props.max - props.min) / 100
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
    <template #tooltip>
      <slot name="tooltip" />
    </template>
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
