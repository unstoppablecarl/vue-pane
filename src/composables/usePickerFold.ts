import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function usePickerFold(
  panelRef: Ref<HTMLElement | null>,
  isOpen: Ref<boolean>,
): Ref<boolean> {
  const isComplete = ref(false)

  watch(isOpen, (open) => {
    const el = panelRef.value
    if (!el) return

    isComplete.value = false

    if (open) {
      el.style.transition = 'none'
      el.style.height = 'auto'
      void el.offsetHeight
      const h = el.clientHeight
      el.style.height = '0'
      void el.offsetHeight
      el.style.transition = ''
      void el.offsetHeight
      el.style.height = h + 'px'
      el.addEventListener('transitionend', (e: TransitionEvent) => {
        if (e.propertyName === 'height') {
          el.style.height = 'auto'
          isComplete.value = true
        }
      }, { once: true })
    } else {
      el.style.transition = 'none'
      el.style.height = el.clientHeight + 'px'
      void el.offsetHeight
      el.style.transition = ''
      void el.offsetHeight
      el.style.height = '0'
      el.addEventListener('transitionend', (e: TransitionEvent) => {
        if (e.propertyName === 'height') el.style.height = ''
      }, { once: true })
    }
  })

  return isComplete
}
