import create from "zustand"
import { immer } from "zustand/middleware/immer"
import { ScoreStore } from "~/modules/score/store/types"
import { updateScore } from "~/modules/score/store/functions"
import { temporal } from "zundo"
import { isEqual } from "lodash"

export const useScoreStore = create<ScoreStore>()(temporal(immer((set) => ({
  score: 0,
  highScore: 0,
  updateScore: (lines) => set(state => updateScore(state, lines))
})), {
  limit: 1,
  partialize: (state) => {
    const { score, highScore } = state
    return { score, highScore }
  },
  equality: isEqual
}))

export const initialScoreStore = useScoreStore.getState()
export const useTemporalScoreStore = create(useScoreStore.temporal)
