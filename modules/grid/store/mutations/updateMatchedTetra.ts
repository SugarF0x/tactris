import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"
import { getRandomTetra } from "~/modules/tetra"

export function updateMatchedTetra(state: WritableDraft<GridStore>, index: number): void {
  const oldTetraTypes = state.tetras.map(tetra => tetra.type)
  state.tetras[index] = getRandomTetra(oldTetraTypes)
}
