import { PositionId } from "~/utils"
import { TetraObject } from "~/modules/tetra"

export interface GridStore {
  filledIds: PositionId[]
  selectedIds: PositionId[]
  tetras: [TetraObject, TetraObject]
  selectId: (id: PositionId) => void
  commitSelectedIds: () => void
}
