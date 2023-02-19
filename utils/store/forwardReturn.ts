import { WritableDraft } from "immer/dist/types/types-external"

export function forwardReturn<T, R>(set: (recipe: (state: WritableDraft<T>) => void) => void, func: (state: WritableDraft<T>) => R): R {
  let result = null as R
  set(state => { result = func(state) })
  return result
}
