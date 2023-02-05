import { WritableDraft } from "immer/dist/types/types-external"
import { UndoableItems, UndoStore } from "~/services/undo"

export function unsetUndoItems(state: WritableDraft<UndoStore>) {
  state.items = Array(state.items.length).fill(null) as UndoableItems
}
