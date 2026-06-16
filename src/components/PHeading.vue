<script setup lang="ts">
import { usePaneConfig } from '../composables/usePaneConfig'
import { useTooltip } from '../composables/useTooltip'

const {
  label,
  tooltip,
  disabled,
} = defineProps<{
  label: string
  tooltip?: string
  disabled?: boolean
}>()

const { floatingStyles, visible, activeText, show, hide } = useTooltip()
const config = usePaneConfig()
</script>
<template>
  <div
    class="vp-label vp-label--heading"
    :class="{ 'vp--disabled': disabled }"
  >
    <div class="vp-label__text">
      {{ label }}
      <component
        :is="config.tooltipIcon"
        v-if="tooltip && config.tooltipIcon"
        @mouseenter="tooltip && show($event, tooltip)"
        @mouseleave="hide"
      />
      <slot name="after-label-text" />
    </div>
    <Teleport
      v-if="tooltip"
      to="body"
    >
      <div
        v-if="visible"
        ref="floatingEl"
        class="vp-tooltip"
        :style="floatingStyles"
      >
        {{ activeText }}
      </div>
    </Teleport>
  </div>
</template>
<style lang="scss">
@use '../styles/view/label';
</style>
