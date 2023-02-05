import { WritableDraft } from "immer/dist/types/types-external"
import { UndoStore } from "~/services/undo"

export function incTotalUndos(state: WritableDraft<UndoStore>) {
  state.totalUndos++
}
