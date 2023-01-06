import { PositionId } from "~/utils"
import { TetraObject } from "~/modules/tetra"

export interface GridTetras {
  available: [TetraObject, TetraObject]
  reserve: TetraObject
}

export interface GridStore {
  filledIds: PositionId[]
  selectedIds: PositionId[]
  tetras: GridTetras
  selectId: (id: PositionId) => void
  commitSelectedIds: () => void
  restart: () => void
}
