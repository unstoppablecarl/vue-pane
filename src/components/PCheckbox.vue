<script setup lang="ts">
import PLabel from './PLabel.vue'

const model = defineModel<boolean>({ required: true })
const {
  label,
  tooltip,
  readonly = false,
} = defineProps<{
  label?: string
  tooltip?: string
  readonly?: boolean
}>()

function onChange(e: Event) {
  if (!readonly) model.value = (e.target as HTMLInputElement).checked
}
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <div
      class="vp-checkbox"
      :class="{ 'vp-checkbox--readonly': readonly }"
    >
      <label class="vp-checkbox__label">
        <input
          class="vp-checkbox__input"
          type="checkbox"
          :checked="model"
          @change="onChange"
        >
        <div class="vp-checkbox__box">
          <svg viewBox="0 0 16 16">
            <path d="M2 8l4 4l8 -8" />
          </svg>
        </div>
      </label>
    </div>
  </PLabel>
</template>
<style lang="scss">
@use '../styles/view/checkbox';
</style>
