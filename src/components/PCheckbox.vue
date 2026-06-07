<script setup lang="ts">
import PLabel from './PLabel.vue'

const model = defineModel<boolean>({ required: true })
const {
  label,
  tooltip,
} = defineProps<{
  label?: string
  tooltip?: string
}>()
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <div class="vp-checkbox">
      <label class="vp-checkbox__label">
        <input
          class="vp-checkbox__input"
          type="checkbox"
          :checked="model"
          @change="model = ($event.target as HTMLInputElement).checked"
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
