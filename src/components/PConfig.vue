<script setup lang="ts">
import { CONFIG_DEFAULTS, type PaneConfig, providePaneConfig } from '../composables/usePaneConfig.ts'

const props = defineProps<Partial<PaneConfig>>()
const defined = Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined))
providePaneConfig({ CONFIG_DEFAULTS, ...defined } as Partial<PaneConfig>)
</script>
<template>
  <slot />
</template>
