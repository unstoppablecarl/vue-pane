<script setup lang="ts">
import PLabel from './PLabel.vue'

const model = defineModel<string | number>({ required: true })
const {
  label,
  tooltip,
  options,
  readonly = false,
} = defineProps<{
  label?: string
  tooltip?: string
  options: { value: string | number, label: string }[]
  readonly?: boolean
}>()

function onChange(e: Event) {
  if (!readonly) model.value = (e.target as HTMLSelectElement).value
}
</script>
<template>
  <PLabel
    :label="label"
    :tooltip="tooltip"
  >
    <div
      class="vp-select"
      :class="{ 'vp-select--readonly': readonly }"
    >
      <select
        class="vp-select__input"
        :value="model"
        @change="onChange"
      >
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
      <div class="vp-select__arrow">
        <svg viewBox="0 0 16 16">
          <path d="M 2 5 L 8 11 L 14 5" />
        </svg>
      </div>
    </div>
  </PLabel>
</template>
<style lang="scss">
@use '../styles/view/list';
</style>
