import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridCell, GridStore, PositionId, Tetra } from './types'
import { getTetra } from './helpers'

export const useGridStore = create<GridStore>()(immer((set) => ({
  cells: {},
  tetras: [getTetra(), getTetra()],
  setTetra: (index: 0 | 1, tetra: Tetra) => set(state => { state.tetras[index] = tetra }),
  setCell: (id: PositionId, cell: GridCell) => set(state => { state.cells[id] = cell })
})))
