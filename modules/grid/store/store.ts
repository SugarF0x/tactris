import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridCell, GridStore } from './types'
import { Tetra, getTetra } from "~/modules/tetra"
import { PositionId } from "~/modules/position"

export const useGridStore = create<GridStore>()(immer((set) => ({
  cells: {},
  tetras: [getTetra(), getTetra()],
  setTetra: (index: 0 | 1, tetra: Tetra) => set(state => { state.tetras[index] = tetra }),
  setCell: (id: PositionId, cell: GridCell) => set(state => { state.cells[id] = cell })
})))
