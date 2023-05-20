import { ScoreStore } from "~/modules/score"

export const getUndoCost = (state: ScoreStore): number => Math.pow(2, state.undoCount)
