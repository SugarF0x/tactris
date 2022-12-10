import { PositionId } from "~/modules/position"
import { TetraObject } from "~/modules/tetra"

export interface GridStore {
  filledIds: PositionId[]
  selectedIds: PositionId[]
  tetras: [TetraObject, TetraObject]
  setTetra: (index: 0 | 1, tetra: TetraObject) => void
  selectId: (id: PositionId) => void
  fillId: (id: PositionId) => void
}
