import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"
import { getRandomTetra, TetraObject } from "~/modules/tetra"

export function updateMatchedTetra(state: WritableDraft<GridStore>, tetra: TetraObject): void {
  const oldTetraTypes = state.tetras.map(tetra => tetra.type)
  state.tetras[state.tetras.indexOf(tetra)] = getRandomTetra(oldTetraTypes)
}
