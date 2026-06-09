import { customRef, type Ref } from 'vue'

export const POLLING_REF = Symbol('vp-polling-ref')

export interface PollingRef<T> extends Ref<T> {
  readonly [POLLING_REF]: true
  subscribe(): void
  unsubscribe(): void
}

export function pollingRef<O extends object, K extends keyof O>(
  obj: O,
  key: K,
  interval = 100,
): PollingRef<O[K]> {
  let activeCount = 0
  let timer: ReturnType<typeof setInterval> | null = null
  let _trigger: () => void = () => {
  }

  const r = customRef<O[K]>((track, trigger) => {
    _trigger = trigger
    return {
      get() {
        track()
        return obj[key]
      },
      set(val) {
        obj[key] = val
        trigger()
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
    if (activeCount === 0) throw new Error('pollingRef: unsubscribe called more times than subscribe')
    activeCount--
    sync()
  }

  const result = r as unknown as PollingRef<O[K]>
  Object.defineProperty(result, POLLING_REF, { value: true })
  result.subscribe = subscribe
  result.unsubscribe = unsubscribe

  return result
}

export function isPollingRef<T>(r: Ref<T> | unknown): r is PollingRef<T>
export function isPollingRef(r: any): r is PollingRef<any> {
  return r?.[POLLING_REF] === true
}
