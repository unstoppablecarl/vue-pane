import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useElementPositions(containerRef: Ref<HTMLElement | null>) {
  let observer: MutationObserver | null = null

  function update() {
    const el = containerRef.value
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]

    for (const child of children) {
      child.classList.remove('vp--first', 'vp--last', 'vp--very-last')
    }

    const visible = children.filter(c => !c.classList.contains('vp--hidden'))
    if (visible.length === 0) return

    visible[0].classList.add('vp--first')
    visible[visible.length - 1].classList.add('vp--last')

    const folders = visible.filter(c => c.classList.contains('vp-folder'))
    if (folders.length > 0) {
      folders[folders.length - 1].classList.add('vp--very-last')
    }
  }

  onMounted(() => {
    update()
    observer = new MutationObserver(update)
    if (containerRef.value) {
      observer.observe(containerRef.value, { childList: true, subtree: false, attributes: true, attributeFilter: ['class'] })
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
