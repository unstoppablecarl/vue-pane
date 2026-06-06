import { ref, watch, onMounted, nextTick } from 'vue'
import type { Ref } from 'vue'

export function useFoldable(
  containerRef: Ref<HTMLElement | null>,
  expandedProp: () => boolean,
  storageKey?: string,
  onToggle?: (expanded: boolean) => void,
): {
  isExpanded: Ref<boolean>
  toggle: () => void
} {
  const stored = storageKey && typeof localStorage !== 'undefined'
    ? localStorage.getItem(storageKey)
    : null

  // localStorage wins over prop on first mount; prop value is the fallback default
  const isExpanded = ref(stored !== null ? stored === 'true' : expandedProp())

  // Persist and notify whenever state changes (from toggle or prop change)
  watch(isExpanded, (val) => {
    if (storageKey && typeof localStorage !== 'undefined') {
      localStorage.setItem(storageKey, String(val))
    }
    onToggle?.(val)
  })

  onMounted(() => {
    if (containerRef.value && isExpanded.value) {
      containerRef.value.style.height = 'auto'
    }
  })

  function animateCollapse(el: HTMLElement) {
    el.style.height = el.scrollHeight + 'px'
    void el.offsetHeight
    el.style.height = '0'
    isExpanded.value = false
    el.addEventListener('transitionend', (e: TransitionEvent) => {
      if (e.propertyName === 'height') el.style.height = ''
    }, { once: true })
  }

  function animateExpand(el: HTMLElement) {
    const targetHeight = el.scrollHeight
    isExpanded.value = true
    nextTick(() => {
      if (targetHeight === 0) {
        el.style.height = 'auto'
        return
      }
      void el.offsetHeight
      el.style.height = targetHeight + 'px'
      el.addEventListener('transitionend', (e: TransitionEvent) => {
        if (e.propertyName === 'height' && isExpanded.value) {
          el.style.height = 'auto'
        }
      }, { once: true })
    })
  }

  // Respond to the parent changing the prop (supports v-model:expanded)
  watch(expandedProp, (val) => {
    if (val === isExpanded.value) return
    const el = containerRef.value
    if (!el) return
    if (val) animateExpand(el)
    else animateCollapse(el)
  })

  function toggle() {
    const el = containerRef.value
    if (!el) return
    if (isExpanded.value) animateCollapse(el)
    else animateExpand(el)
  }

  return { isExpanded, toggle }
}
