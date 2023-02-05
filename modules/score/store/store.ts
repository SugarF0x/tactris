import create from "zustand"
import { immer } from "zustand/middleware/immer"
import { ScoreStore } from "~/modules/score/store/types"
import { restart, updateScore } from "~/modules/score/store/functions"
import { temporal } from "zundo"
import { isEqual } from "lodash"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const useScoreStore = create<ScoreStore>()(persist(temporal(immer((set) => ({
  score: 0,
  highScore: 0,
  updateScore: (lines) => set(state => updateScore(state, lines)),
  restart: () => set(restart)
})), {
  limit: 1,
  partialize: (state) => {
    const { score, highScore } = state
    return { score, highScore }
  },
  equality: isEqual
}), {
  name: 'score-storage',
  storage: createJSONStorage(() => AsyncStorage)
}))

export const scoreStoreInitialState = useScoreStore.getState()
export const useTemporalScoreStore = create(useScoreStore.temporal)
