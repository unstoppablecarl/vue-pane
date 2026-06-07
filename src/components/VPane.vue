<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFoldable } from '../composables/useFoldable'
import { type PaneConfig, providePaneConfig } from '../composables/usePaneConfig'

const expandedModel = defineModel<boolean>('expanded', { default: undefined })

const {
  title,
  id,
  disabled,
  config,
} = defineProps<{
  title?: string
  id?: string
  disabled?: boolean
  config?: PaneConfig
}>()

if (config) {
  providePaneConfig(config)
}

const key = id ?? title
const hasTitle = computed(() => !!title)
const containerRef = ref<HTMLElement | null>(null)
const { isExpanded, toggle } = useFoldable(
  containerRef,
  expandedModel,
  key ? `vp-pane-${key}` : undefined,
)
</script>
<template>
  <div
    class="vp-pane"
    :class="{
      'vp-pane--expanded': isExpanded,
      'vp-pane--no-title': !hasTitle,
      'vp--disabled': disabled,
    }"
  >
    <button
      v-if="hasTitle"
      class="vp-pane__title"
      @click="toggle"
    >
      {{ title }}
      <div class="vp-pane__chevron" />
    </button>
    <div
      ref="containerRef"
      class="vp-pane__content"
    >
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
@use '../styles/index.scss';
</style>
