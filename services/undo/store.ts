import create from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { UndoStore } from "~/services/undo/types"

export const useUndoStore = create<UndoStore>()(persist(immer(set => ({
  items: [
    null,
    null
  ],
  totalUndos: 0,
  update: () => {},
  undo: () => {}
})), {
  name: "undo-storage",
  storage: createJSONStorage(() => AsyncStorage)
}))

export const undoStoreInitialState = useUndoStore.getState()
