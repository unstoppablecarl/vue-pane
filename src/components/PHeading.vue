<script setup lang="ts">
import { usePaneConfig } from '../composables/usePaneConfig'
import { useTooltip } from '../composables/useTooltip'

const {
  label,
  tooltip,
} = defineProps<{
  label: string
  tooltip?: string
}>()

const { floatingStyles, visible, activeText, show, hide } = useTooltip()
const config = usePaneConfig()
</script>
<template>
  <div class="vp-label vp-label--heading">
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
