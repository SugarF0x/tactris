import create from 'zustand'
import { persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { RootState } from "~/services/store/types"
import { temporal } from "zundo"
import { immer } from "zustand/middleware/immer"
import { isEqual } from "lodash"
import { scoreSlice } from "~/modules/score"
import { gridSlice } from "~/modules/grid"

export const useRootStore = create<RootState>()(
  persist(
    temporal(
      immer((...a) => ({
        ...scoreSlice(...a),
        ...gridSlice(...a)
      })),
      {
        limit: 1,
        equality: isEqual
      }),
    {
      name: 'score-storage',
      getStorage: () => AsyncStorage
    }
  )
)

export const initialRootState = useRootStore.getState()
export const useTemporalStore = create(useRootStore.temporal)


