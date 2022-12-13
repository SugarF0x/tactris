import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridStore } from './types'
import { getCompletionSpecs, getInitialTetras } from './helpers'
import { doesInputMatchTetra, getTetra } from "~/modules/tetra"
import { idToPosition } from "~/modules/position"
import { getCompletionIntersections } from "~/modules/grid/store/helpers"

export const useGridStore = create<GridStore>()(immer((set) => ({
  filledIds: [],
  selectedIds: [],
  tetras: getInitialTetras(),
  selectId: (id) => set(state => {
    if (state.selectedIds.includes(id)) return
    if (state.filledIds.includes(id)) return
    if (state.selectedIds.length >= 4) state.selectedIds.shift()
    state.selectedIds.push(id)
  }),
  commitSelectedIds: () => set(state => {
    if (state.selectedIds.length < 4) return
    const selectedTetra = state.selectedIds.map(idToPosition)

    for (const [key, tetra] of Object.entries(state.tetras)) {
      const index = Number(key) as 0 | 1
      if (!doesInputMatchTetra(selectedTetra, tetra)) continue

      state.filledIds.push(...state.selectedIds)
      const specs = getCompletionSpecs(state.selectedIds)
      const completions = getCompletionIntersections(state.filledIds, [...specs.horizontal, ...specs.vertical])
      state.filledIds = state.filledIds.filter(id => !completions.includes(id))
      state.selectedIds.length = 0

      const oldTetraTypes = state.tetras.map(tetra => tetra.type)
      state.tetras[index] = getTetra(oldTetraTypes)

      break
    }
  })
})))
