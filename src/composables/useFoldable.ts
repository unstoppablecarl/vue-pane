import { computed, inject, type InjectionKey, nextTick, onMounted, provide, type Ref, ref, watch } from 'vue'
import { usePaneConfig } from './usePaneConfig.ts'

function measureExpandedHeight(el: HTMLElement, expandedClass: string): number {
  const parent = el.parentElement
  if (!parent) return 0

  const wasExpanded = parent.classList.contains(expandedClass)

  // Temporarily disable transitions and apply expanded state to measure true height
  el.style.transition = 'none'
  if (!wasExpanded) {
    parent.classList.add(expandedClass)
    el.style.height = 'auto'
  }
  void el.offsetHeight
  const height = el.clientHeight

  if (!wasExpanded) {
    parent.classList.remove(expandedClass)
    el.style.height = ''
  }
  void el.offsetHeight
  el.style.transition = ''

  return height
}

export function useFoldable(
  containerRef: Ref<HTMLElement | null>,
  expandedRef: Ref<boolean>,
  storageKey?: string,
  expandedClass = 'vp-folder--expanded',
): {
  isExpanded: Ref<boolean>
  toggle: () => void
} {
  let stored: string | null = null
  if (storageKey) {
    stored = localStorage?.getItem?.(storageKey) ?? null
  }
  const config = usePaneConfig()
  const onToggle = (val: boolean) => expandedRef.value = val
  const initialPropValue = expandedRef.value as boolean | undefined
  const isExpanded = ref(
    initialPropValue !== undefined
      ? initialPropValue
      : stored !== null
        ? stored === 'true'
        : config.expandedDefault ?? true,
  )

  watch(isExpanded, (val) => {
    if (storageKey && typeof localStorage !== 'undefined') {
      localStorage.setItem(storageKey, String(val))
    }
    onToggle(val)
  })

  onMounted(() => {
    const el = containerRef.value
    if (el && isExpanded.value) {
      el.style.height = 'auto'
    }
  })

  function animateExpand(el: HTMLElement) {
    const targetHeight = measureExpandedHeight(el, expandedClass)
    isExpanded.value = true

    nextTick(() => {
      if (targetHeight === 0) {
        el.style.height = 'auto'
        return
      }
      // Pin padding to 0 inline so both height and padding can animate from 0
      el.style.paddingTop = '0'
      el.style.paddingBottom = '0'
      void el.offsetHeight

      el.style.height = targetHeight + 'px'
      el.style.paddingTop = ''
      el.style.paddingBottom = ''

      el.addEventListener('transitionend', (e: TransitionEvent) => {
        if (e.propertyName === 'height' && isExpanded.value) {
          el.style.height = 'auto'
        }
      }, { once: true })
    })
  }

  function animateCollapse(el: HTMLElement) {
    // Lock to px so height: auto → 0 is animatable
    el.style.transition = 'none'
    el.style.height = el.clientHeight + 'px'
    void el.offsetHeight
    el.style.transition = ''
    void el.offsetHeight

    el.style.height = '0'
    isExpanded.value = false

    el.addEventListener('transitionend', (e: TransitionEvent) => {
      if (e.propertyName === 'height') {
        el.style.height = ''
      }
    }, { once: true })
  }

  watch(() => expandedRef.value as boolean | undefined, (val) => {
    if (val === undefined || val === isExpanded.value) return
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

export const EXPANDED_KEY: InjectionKey<Ref<boolean>> = Symbol('vp-expanded')

export function getPaneExpanded(): Ref<boolean> {
  return inject(EXPANDED_KEY, ref(true))
}

export function cascadeExpanded(isExpanded: Ref<boolean>) {
  const parentExpanded = inject(EXPANDED_KEY, ref(true))
  const effectiveExpanded = computed(() => parentExpanded.value && isExpanded.value)
  provide(EXPANDED_KEY, effectiveExpanded)
}
