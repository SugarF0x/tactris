import { GridStore } from "~/modules/grid"
import { ScoreStore } from "~/modules/score"

type Nullable<T> = T | null
export type UndoableItems = [
  Nullable<GridStore>,
  Nullable<ScoreStore>
]

export interface UndoStore {
  items: UndoableItems
  totalUndos: number
  update: () => void
  undo: () => void
}
