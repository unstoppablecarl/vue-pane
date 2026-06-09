<script setup lang="ts">
import { type PollingRef } from '../composables/pollingRef'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

const modelValue = defineModel<string>()
const {
  poll,
  label,
  tooltip,
  readonly = false,
} = defineProps<{
  poll?: PollingRef<string>
  label?: string
  tooltip?: string
  readonly?: boolean
}>()

const model = usePollingOrModel(poll, modelValue)
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <div
      class="vp-text"
      :class="{ 'vp-text--readonly': readonly }"
    >
      <input
        class="vp-text__input"
        type="text"
        :value="model"
        :readonly="readonly"
        @input="model = ($event.target as HTMLInputElement).value"
      >
    </div>
  </PLabel>
</template>
<style lang="scss">
@use '../styles/view/text';
</style>
