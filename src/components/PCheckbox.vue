<script setup lang="ts">
import { type PollingRef } from '../composables/pollingRef'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

const modelValue = defineModel<boolean>()
const {
  poll,
  label,
  tooltip,
  readonly = false,
} = defineProps<{
  poll?: PollingRef<boolean>
  label?: string
  tooltip?: string
  readonly?: boolean
}>()

const model = usePollingOrModel(poll, modelValue)

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
