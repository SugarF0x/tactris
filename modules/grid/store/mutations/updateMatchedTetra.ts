import { WritableDraft } from "immer/dist/types/types-external"
import { GridStore } from "~/modules/grid/store/types"
import { getRandomTetra } from "~/modules/tetra"

export function updateMatchedTetra(state: WritableDraft<GridStore>, index: number): void {
  const oldTetraTypes = [state.tetras.available, state.tetras.reserve].flat()
  const newTetra = getRandomTetra(oldTetraTypes)

  state.tetras.available[index] = state.tetras.reserve
  state.tetras.reserve = newTetra
}
