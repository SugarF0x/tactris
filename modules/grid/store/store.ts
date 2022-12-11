import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridStore } from './types'
import { doesInputMatchTetra, getTetra } from "~/modules/tetra"
import { idToPosition } from "~/modules/position"

export const useGridStore = create<GridStore>()(immer((set) => ({
  filledIds: [],
  selectedIds: [],
  tetras: [getTetra(), getTetra()],
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
      state.selectedIds.length = 0

      const oldTetraType = state.tetras[index].type
      state.tetras[index] = getTetra([oldTetraType])

      break
    }
  })
})))
