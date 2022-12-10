import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridStore } from './types'
import { getTetra } from "~/modules/tetra"

export const useGridStore = create<GridStore>()(immer((set) => ({
  filledIds: [],
  selectedIds: [],
  tetras: [getTetra(), getTetra()],
  setTetra: (index, tetra) => set(state => { state.tetras[index] = tetra }),
  selectId: (id) => set(state => {
    if (state.selectedIds.includes(id)) return
    if (state.selectedIds.length >= 4) state.selectedIds.shift()
    state.selectedIds.push(id)
  }),
  fillId: (id) => set(state => {
    if (state.filledIds.includes(id)) return
    state.filledIds.push(id) }
  )
})))
