import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridStore } from './types'
import { getTetra } from "~/modules/tetra"

export const useGridStore = create<GridStore>()(immer((set) => ({
  cells: {},
  selectedIds: [],
  tetras: [getTetra(), getTetra()],
  setTetra: (index, tetra) => set(state => { state.tetras[index] = tetra }),
  setCell: (id, cell) => set(state => { state.cells[id] = cell }),
  selectId: (id) => set(state => {
    if (state.selectedIds.includes(id)) return
    if (state.selectedIds.length >= 4) state.selectedIds.shift()
    state.selectedIds.push(id)
  })
})))
