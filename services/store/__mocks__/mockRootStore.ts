import { DeepPartial } from "~/utils/types"
import { cloneDeep, merge } from "lodash"
import { initialRootState, RootState } from "~/services/store"

export const mockRootStore = (stateOverride: DeepPartial<RootState> = {}) => {
  const state: Readonly<RootState> = merge(cloneDeep(initialRootState), stateOverride)
  const draft = cloneDeep<RootState>(state)

  return {
    state,
    draft
  }
}
