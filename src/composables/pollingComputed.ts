import { customRef, readonly, type Ref } from 'vue'
import { POLLING_REF } from './pollingRef'

export interface PollingComputed<T> extends Readonly<Ref<T>> {
  readonly [POLLING_REF]: true
  subscribe(): void
  unsubscribe(): void
}

export function pollingComputed<T>(getter: () => T, interval = 100): PollingComputed<T> {
  let activeCount = 0
  let timer: ReturnType<typeof setInterval> | null = null
  let _trigger: () => void = () => {
  }

  const r = customRef<T>((track, trigger) => {
    _trigger = trigger
    return {
      get() {
        track()
        return getter()
      },
      set() {
      },
    }
  })

  function sync() {
    if (activeCount > 0 && timer === null) {
      timer = setInterval(_trigger, interval)
    } else if (activeCount === 0 && timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  function subscribe() {
    activeCount++
    sync()
  }

  function unsubscribe() {
    if (activeCount === 0) throw new Error('pollingComputed: unsubscribe called more times than subscribe')
    activeCount--
    sync()
  }

  const result = readonly(r) as unknown as PollingComputed<T>
  Object.defineProperty(result, POLLING_REF, { value: true })
  ;(result as any).subscribe = subscribe
  ;(result as any).unsubscribe = unsubscribe

  return result
}
