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
}
