import { UndoStore } from "~/services/undo/types"

const select = <T>(selector: (state: UndoStore) => T) => selector

export const selectCanUndo = select(state => state.items.every(Boolean))
export const selectUndoCost = select(state => Math.min(state.totalUndos * 4, 9999))
