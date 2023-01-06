import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"
import { getRandomTetra } from "~/modules/tetra"

export function updateMatchedTetra(state: WritableDraft<GridStore>, index: number): void {
  const oldTetraTypes = state.tetras.map(tetra => tetra.type)
  const newTetra = getRandomTetra(oldTetraTypes)

  state.tetras[index] = state.tetras[2]
  state.tetras[2] = newTetra
}
