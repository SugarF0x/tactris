import { WritableDraft } from "immer/dist/types/types-external"
import { UndoableItems, UndoStore } from "~/services/undo"
import { isMatch } from "lodash"

export function setUndoItems(state: WritableDraft<UndoStore>, items: UndoableItems) {
  state.items = state.items.map((item, index) => {
    const newState = items[index]

    if (isMatch(item ?? {}, newState ?? {})) return null
    return newState
  }) as UndoableItems
}
