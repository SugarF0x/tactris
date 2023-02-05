import { scoreStoreInitialState, ScoreStore } from "~/modules/score"
import { cloneDeep } from "lodash"

export function getScoreStoreMock(stateOverride: Partial<ScoreStore> = {}) {
  const state: Readonly<ScoreStore> = {
    ...scoreStoreInitialState,
    ...stateOverride
  }

  const draft = cloneDeep<ScoreStore>(state)

  return {
    state,
    draft
  }
}
