import { GridStore } from "~/modules/grid"
import { ScoreStore } from "~/modules/score"
import { StateCreator } from "zustand"

export type RootState =
  & GridStore
  & ScoreStore

export type Slice<State> = StateCreator<
  RootState,
  [["zustand/immer", never]],
  [],
  State
>
