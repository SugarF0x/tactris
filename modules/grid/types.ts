import { Axis } from "~/modules/position"

export interface CompletionLine {
  axis: Axis
  value: number
}

export enum ShiftInstructions {
  DECREASE = 'DECREASE',
  RETAIN = 'RETAIN',
  INCREASE = 'INCREASE',
}
