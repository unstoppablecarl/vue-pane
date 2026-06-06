<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import PLabel from './PLabel.vue'
import PSlider from './PSlider.vue'

const model = defineModel<string>({ required: true })
const { label, alpha: _alpha = false } = defineProps<{
  label?: string
  alpha?: boolean
}>()

const isOpen = ref(false)
const panelRef = ref<HTMLElement | null>(null)
const svCanvas = ref<HTMLCanvasElement | null>(null)

const h = ref(0)
const s = ref(100)
const v = ref(100)

function hsvToRgb(hue: number, sat: number, val: number): [number, number, number] {
  sat /= 100
  val /= 100
  const c = val * sat
  const x = c * (1 - Math.abs((hue / 60) % 2 - 1))
  const m = val - c
  let r = 0, g = 0, b = 0
  if (hue < 60) { r = c; g = x } else if (hue < 120) { r = x; g = c } else if (hue < 180) { g = c; b = x } else if (hue < 240) { g = x; b = c } else if (hue < 300) { r = x; b = c } else { r = c; b = x }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let hue = 0
  if (d !== 0) {
    if (max === r) hue = ((g - b) / d + 6) % 6
    else if (max === g) hue = (b - r) / d + 2
    else hue = (r - g) / d + 4
    hue *= 60
  }
  return [hue, max === 0 ? 0 : d / max * 100, max * 100]
}

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.replace('#', '').match(/.{2}/g)
  if (!m) return [0, 0, 0]
  return [parseInt(m[0], 16), parseInt(m[1], 16), parseInt(m[2], 16)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

function syncFromHex(hex: string) {
  const [r, g, b] = hexToRgb(hex)
  const [hv, sv, vv] = rgbToHsv(r, g, b)
  h.value = hv
  s.value = sv
  v.value = vv
}

syncFromHex(model.value)

watch(model, (val) => {
  syncFromHex(val)
})

function emitCurrentColor() {
  const [r, g, b] = hsvToRgb(h.value, s.value, v.value)
  model.value = rgbToHex(r, g, b)
}

const rgbR = computed(() => hsvToRgb(h.value, s.value, v.value)[0])
const rgbG = computed(() => hsvToRgb(h.value, s.value, v.value)[1])
const rgbB = computed(() => hsvToRgb(h.value, s.value, v.value)[2])

const svMarkerStyle = computed(() => ({
  left: s.value + '%',
  top: (100 - v.value) + '%',
}))

function drawSVPalette(canvas: HTMLCanvasElement, hue: number) {
  const ctx = canvas.getContext('2d')!
  const w = canvas.offsetWidth
  const ht = canvas.offsetHeight
  canvas.width = w
  canvas.height = ht
  const grad1 = ctx.createLinearGradient(0, 0, w, 0)
  grad1.addColorStop(0, '#fff')
  grad1.addColorStop(1, `hsl(${hue}, 100%, 50%)`)
  ctx.fillStyle = grad1
  ctx.fillRect(0, 0, w, ht)
  const grad2 = ctx.createLinearGradient(0, 0, 0, ht)
  grad2.addColorStop(0, 'transparent')
  grad2.addColorStop(1, '#000')
  ctx.fillStyle = grad2
  ctx.fillRect(0, 0, w, ht)
}

onMounted(() => {
  if (svCanvas.value) {
    drawSVPalette(svCanvas.value, h.value)
  }
})

watch(h, (hue) => {
  if (svCanvas.value) {
    drawSVPalette(svCanvas.value, hue)
  }
})

watch(isOpen, (open) => {
  const el = panelRef.value
  if (!el) return
  if (open) {
    el.style.height = el.scrollHeight + 'px'
    el.addEventListener('transitionend', (e: TransitionEvent) => {
      if (e.propertyName === 'height') el.style.height = 'auto'
    }, { once: true })
  } else {
    el.style.height = el.scrollHeight + 'px'
    void el.offsetHeight
    el.style.height = '0'
  }
})

function toggle() {
  isOpen.value = !isOpen.value
}

let svDragging = false

function getSVFromEvent(e: PointerEvent): { s: number, v: number } {
  const canvas = svCanvas.value!
  const rect = canvas.getBoundingClientRect()
  const sx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * 100
  const vx = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height)) * 100
  return { s: sx, v: vx }
}

function onSVDown(e: PointerEvent) {
  e.preventDefault()
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  svDragging = true
  const { s: ns, v: nv } = getSVFromEvent(e)
  s.value = ns
  v.value = nv
  emitCurrentColor()
}

function onSVMove(e: PointerEvent) {
  if (!svDragging) return
  const { s: ns, v: nv } = getSVFromEvent(e)
  s.value = ns
  v.value = nv
  emitCurrentColor()
}

function onSVUp() {
  svDragging = false
}

function onHueChange(val: number) {
  h.value = val
  emitCurrentColor()
}

function onHexChange(e: Event) {
  const val = (e.target as HTMLInputElement).value
  if (/^#[0-9a-fA-F]{6}$/.test(val)) {
    syncFromHex(val)
    model.value = val
  }
}

function onRGBChange(channel: 'r' | 'g' | 'b', e: Event) {
  const val = parseInt((e.target as HTMLInputElement).value)
  if (isNaN(val)) return
  const [cr, cg, cb] = hsvToRgb(h.value, s.value, v.value)
  const r2 = channel === 'r' ? val : cr
  const g2 = channel === 'g' ? val : cg
  const b2 = channel === 'b' ? val : cb
  const [nh, ns, nv] = rgbToHsv(r2, g2, b2)
  h.value = nh
  s.value = ns
  v.value = nv
  model.value = rgbToHex(r2, g2, b2)
}
</script>
<template>
  <PLabel :label="label">
    <div
      class="vp-color"
      :class="{ 'vp-color--expanded': isOpen }"
    >
      <div class="vp-color__header">
        <div class="vp-color__swatch">
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
      <div
        ref="panelRef"
        class="vp-color__picker-panel"
      >
        <div class="vp-color__sv-palette">
          <canvas
            ref="svCanvas"
            class="vp-color__sv-canvas"
            @pointerdown="onSVDown"
            @pointermove="onSVMove"
            @pointerup="onSVUp"
            @pointercancel="onSVUp"
          />
          <div
            class="vp-color__sv-marker"
            :style="svMarkerStyle"
          />
        </div>
        <div class="vp-color__hue-bar">
          <PSlider
            :model-value="h"
            :min="0"
            :max="360"
            :step="1"
            @update:model-value="onHueChange"
          />
        </div>
        <div class="vp-color__rgb-row">
          <div class="vp-color__rgb-input">
            <input
              class="vp-text__input"
              type="text"
              :value="rgbR"
              @change="e => onRGBChange('r', e)"
            >
          </div>
          <div class="vp-color__rgb-input">
            <input
              class="vp-text__input"
              type="text"
              :value="rgbG"
              @change="e => onRGBChange('g', e)"
            >
          </div>
          <div class="vp-color__rgb-input">
            <input
              class="vp-text__input"
              type="text"
              :value="rgbB"
              @change="e => onRGBChange('b', e)"
            >
          </div>
        </div>
      </div>
    </div>
  </PLabel>
</template>
