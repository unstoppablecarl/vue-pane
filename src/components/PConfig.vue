<script setup lang="ts">
import { type PaneConfig, providePaneConfig } from '../composables/usePaneConfig.ts'

const props = defineProps<PaneConfig>()
const defined = Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined))
providePaneConfig(defined as Partial<PaneConfig>)
</script>
<template>
  <slot />
</template>
