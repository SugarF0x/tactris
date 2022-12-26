import create from "zustand"
import { immer } from "zustand/middleware/immer"
import { ScoreStore } from "~/modules/score/store/types"

export const useScoreStore = create<ScoreStore>()(immer((set) => ({
  score: 0,
  highScore: 0,
  updateScore: (lines) => set(state => {
    const value = state.score + lines.reduce((acc, _, index) => acc + 10 * (.8 + index + .2), 0)

    state.score = value
    state.highScore = Math.max(state.highScore, value)
  })
})))
