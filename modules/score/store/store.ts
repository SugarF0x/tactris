import { ScoreStore } from "~/modules/score/store/types"
import { restart, updateScore } from "~/modules/score/store/functions"
import { Slice } from "~/services/store/types"

export const scoreSlice: Slice<ScoreStore> = set => ({
  score: 0,
  highScore: 0,
  updateScore: (lines) => set(state => updateScore(state, lines)),
  restart: () => set(restart)
})
