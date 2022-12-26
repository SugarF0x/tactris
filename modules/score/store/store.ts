import create from "zustand"
import { immer } from "zustand/middleware/immer"
import { ScoreStore } from "~/modules/score/store/types"

export const useScoreStore = create<ScoreStore>()(immer((set) => ({
  score: 0,
  highScore: 0,
  setScore: (value) => set(state => { state.score = value }),
  updateHighScore: () => set(state => {
    state.highScore = state.score
    state.score = 0
  })
})))
