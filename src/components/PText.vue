<script setup lang="ts">
import { computed } from 'vue'
import { type PollingRef } from '../composables/pollingRef'
import { usePollingOrModel } from '../composables/usePolling'
import PLabel from './PLabel.vue'

type Polling = {
  poll: PollingRef<string>
  modelValue?: never
}
type Model = {
  poll?: never
  modelValue?: string
}

type Props = {
  label?: string
  tooltip?: string
  readonly?: boolean
} & (Polling | Model)

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()

const modelRef = computed<string | undefined>({
  get: () => props.modelValue,
  set: (val: string | undefined) => emit('update:modelValue', val!),
})

const model = usePollingOrModel(props.poll, modelRef)
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
