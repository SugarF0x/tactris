import create from "zustand"
import { immer } from "zustand/middleware/immer"
import { ScoreStore } from "~/modules/score/store/types"
import { updateScore } from "~/modules/score/store/functions"

export const useScoreStore = create<ScoreStore>()(immer((set) => ({
  score: 0,
  highScore: 0,
  updateScore: (lines) => set(state => updateScore(state, lines))
})))

export const initialScoreStore = useScoreStore.getState()
