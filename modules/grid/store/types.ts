import { PositionId } from "~/modules/position"
import { TetraObject } from "~/modules/tetra"

export interface GridCell {
  id: PositionId
  isFilled: boolean
  isSelected: boolean
}

export interface GridStore {
  cells: Record<PositionId, GridCell>
  tetras: [TetraObject, TetraObject]
  setTetra: (index: 0 | 1, tetra: TetraObject) => void
  setCell: (id: PositionId, cell: GridCell) => void
}
