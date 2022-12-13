import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridStore } from './types'
import { getFilledLines, getInitialTetras, linesToPositionIdSet } from './helpers'
import { doesInputMatchTetra, getTetra } from "~/modules/tetra"
import { idToPosition } from "~/modules/position"
import { getCompletionLines } from "~/modules/grid/store/helpers"

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

      const completionLines = getCompletionLines(state.selectedIds)

      state.filledIds.push(...state.selectedIds)
      state.selectedIds.length = 0

      const filledLines = getFilledLines(state.filledIds, completionLines)
      const filledLineIds = linesToPositionIdSet(filledLines)
      state.filledIds = state.filledIds.filter(id => !filledLineIds.includes(id))

      const oldTetraTypes = state.tetras.map(tetra => tetra.type)
      state.tetras[index] = getTetra(oldTetraTypes)

      break
    }
  })
})))
