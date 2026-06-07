import { type Component, inject, type InjectionKey, provide } from 'vue'
import PTooltipIcon from '../components/PTooltipIcon.vue'

export interface PaneConfig {
  readonly tooltipIcon?: Component | null
  readonly expandedDefault?: boolean
}

const DEFAULTS: PaneConfig = {
  expandedDefault: true,
  tooltipIcon: PTooltipIcon,
}

export const PANE_CONFIG_KEY: InjectionKey<PaneConfig> = Symbol('vp-config')

export function usePaneConfig(): PaneConfig {
  return inject(PANE_CONFIG_KEY, DEFAULTS)
}

export function providePaneConfig(config: Partial<PaneConfig> | null = null): void {
  provide(PANE_CONFIG_KEY, {
    ...usePaneConfig(),
    ...config,
  } as PaneConfig)
}
