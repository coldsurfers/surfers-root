import { StorageItem } from './types'

const storage = {
  set(item: StorageItem, value: string) {
    localStorage.setItem(item, value)
  },
  get<ParsedValueT>(item: StorageItem) {
    const value = localStorage.getItem(item)
    try {
      if (!value) return null
      const parsed = JSON.parse(value) as ParsedValueT
      return parsed
    } catch (e) {
      console.error(e)
      return null
    }
  },
  remove(item: StorageItem) {
    localStorage.removeItem(item)
  },
  clear() {
    localStorage.clear()
  },
}

export default storage
