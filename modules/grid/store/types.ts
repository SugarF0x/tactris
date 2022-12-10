import { PositionId } from "~/modules/position"
import { TetraObject } from "~/modules/tetra"

export interface GridCell {
  id: PositionId
  isFilled: boolean
}

export interface GridStore {
  cells: Record<PositionId, GridCell>
  selectedIds: PositionId[]
  tetras: [TetraObject, TetraObject]
  setTetra: (index: 0 | 1, tetra: TetraObject) => void
  setCell: (id: PositionId, cell: GridCell) => void
  selectId: (id: PositionId) => void
}
