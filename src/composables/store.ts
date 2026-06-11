export function useStore(storeId: string) {
  if (typeof localStorage === 'undefined') {
    return {
      get(_path: string, defaultValue: boolean) {
        return defaultValue
      },
      set() {
      },
    }
  }

  function getStore(): Record<string, boolean> {
    try {
      return JSON.parse(localStorage.getItem(storeId) ?? '{}')
    } catch {
      return {}
    }
  }

  function get(path: string, defaultValue: boolean): boolean {
    const store = getStore()
    return store?.[path] ?? defaultValue
  }

  function set(path: string, val: boolean) {
    const store = getStore()
    store[path] = val
    localStorage.setItem(storeId, JSON.stringify(store))
  }

  return {
    all: getStore,
    get,
    set,
  }
}
