import { GridStore } from './types'
import { commitSelectedIds, restart, selectId } from './functions'
import { getInitialTetras } from './helpers'
import { Slice } from "~/services/store/types"

export const gridSlice: Slice<GridStore> = set => ({
  filledIds: [],
  selectedIds: [],
  tetras: getInitialTetras(),
  selectId: (id) => set(state => selectId(state, id)),
  commitSelectedIds: () => set(commitSelectedIds),
  restart: () => set(restart)
})
