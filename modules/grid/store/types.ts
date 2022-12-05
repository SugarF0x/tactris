import { PositionId } from "~/modules/position"
import { Tetra } from "~/modules/tetra"

export interface GridCell {
  id: PositionId
  isFilled: boolean
  isSelected: boolean
}

export interface GridStore {
  cells: Record<PositionId, GridCell>
  tetras: [Tetra, Tetra]
}
