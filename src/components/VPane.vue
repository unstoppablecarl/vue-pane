<script setup lang="ts">
import { computed, ref } from 'vue'
import { cascadeExpanded, useFoldable } from '../composables/useFoldable'
import { type PaneConfig, providePaneConfig } from '../composables/usePaneConfig'

const expandedModel = defineModel<boolean>('expanded', { default: undefined })

const {
  title,
  id,
  disabled,
  config,
} = defineProps<{
  title: string
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
  `vp-pane: ${key}`,
)

cascadeExpanded(isExpanded)
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
      <span class="vp-pane__chevron" />
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
@use '../styles/view/root';
@use '../styles/view/tooltip';
</style>
