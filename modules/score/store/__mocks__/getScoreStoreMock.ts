import { initialScoreStore, ScoreStore } from "~/modules/score"
import { cloneDeep } from "lodash"

export function getScoreStoreMock(stateOverride: Partial<ScoreStore> = {}) {
  const state: Readonly<ScoreStore> = {
    ...initialScoreStore,
    ...stateOverride
  }

  const draft = cloneDeep<ScoreStore>(state)

  return {
    state,
    draft
  }
}
