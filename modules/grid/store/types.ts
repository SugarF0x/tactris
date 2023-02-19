import { PositionId } from "~/utils"
import { TetraObject } from "~/modules/tetra"
import { CompletionLine } from "~/modules/grid"

export interface GridTetras {
  available: [TetraObject, TetraObject]
  reserve: TetraObject
}

export interface GridStore {
  filledIds: PositionId[]
  selectedIds: PositionId[]
  tetras: GridTetras
  selectId: (id: PositionId) => void
  commitSelectedIds: () => CompletionLine[]
  restart: () => void
}
