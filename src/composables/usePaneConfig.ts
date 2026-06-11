import { type Component, inject, type InjectionKey, provide } from 'vue'
import PTooltipIcon from '../components/PTooltipIcon.vue'

export interface PaneConfig {
  readonly tooltipIcon?: Component | null
  readonly expandedDefault: boolean
  readonly storageEnabled: boolean
  readonly storageKey: string
}

export const CONFIG_DEFAULTS: PaneConfig = {
  expandedDefault: true,
  tooltipIcon: PTooltipIcon,
  storageKey: 'vue-pane',
  storageEnabled: true,
}

export const PANE_CONFIG_KEY: InjectionKey<PaneConfig> = Symbol('vp-config')

export function usePaneConfig(): PaneConfig {
  return inject(PANE_CONFIG_KEY, CONFIG_DEFAULTS)
}

export function providePaneConfig(config: Partial<PaneConfig> | null = null): void {
  provide(PANE_CONFIG_KEY, {
    ...CONFIG_DEFAULTS,
    ...inject(PANE_CONFIG_KEY, null),
    ...config,
  } as PaneConfig)
}
