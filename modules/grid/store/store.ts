import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridStore } from './types'
import { getTetra } from './helpers'

export const useGridStore = create<GridStore>()(immer((set) => ({
  cells: {},
  tetras: [getTetra(), getTetra()]
})))
