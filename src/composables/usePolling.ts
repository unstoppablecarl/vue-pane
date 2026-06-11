import { onMounted, onUnmounted, type Ref, watch } from 'vue'
import type { PollingRef } from './pollingRef'
import { getPaneExpanded } from './useFoldable'

export function usePolling(r: PollingRef<any>, visible = getPaneExpanded()) {
  let active = false

  function activate() {
    if (active) return
    active = true
    r.subscribe()
  }

  function deactivate() {
    if (!active) return
    active = false
    r.unsubscribe()
  }

  watch(visible, (val) => {
    if (val) activate()
    else deactivate()
  })
  onMounted(() => {
    if (visible.value) activate()
  })
  onUnmounted(deactivate)
}

export function usePollingOrModel<T, S = T>(poll: PollingRef<T> | undefined, modelValue: Ref<T, S>, visible = getPaneExpanded()): Ref<NonNullable<T>, NonNullable<S>> {
  if (poll) usePolling(poll, visible)

  return (poll ?? modelValue) as unknown as Ref<NonNullable<T>, NonNullable<S>>
}
