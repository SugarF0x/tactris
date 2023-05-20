import create from 'zustand'
import { GridStore } from './types'
import { commitSelectedIds, restart, selectId } from './functions'
import { getInitialTetras } from './helpers'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { temporal } from 'zundo'
import { gridTemporalOptions, gridPersistOptions } from './options'
import { forwardReturn } from "~/utils"

export const useGridStore = create<GridStore>()(persist(temporal(immer((set) => ({
  filledIds: [],
  selectedIds: [],
  tetras: getInitialTetras(),
  selectId: (id) => set(state => selectId(state, id)),
  commitSelectedIds: () => forwardReturn(set, commitSelectedIds),
  restart: () => set(restart)
})), gridTemporalOptions), gridPersistOptions))

export const gridStoreInitialState = useGridStore.getState()
export const useTemporalGridStore = create(useGridStore.temporal)
