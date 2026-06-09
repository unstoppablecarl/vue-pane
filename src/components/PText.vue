<script setup lang="ts">
import PLabel from './PLabel.vue'

const model = defineModel<string>({ required: true })
const {
  label,
  tooltip,
  readonly = false,
} = defineProps<{
  label?: string
  tooltip?: string
  readonly?: boolean
}>()
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
