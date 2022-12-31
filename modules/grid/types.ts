import { Axis } from "~/utils"

export interface CompletionLine {
  axis: Axis
  value: number
}

export enum ShiftInstructions {
  DECREASE = 'DECREASE',
  RETAIN = 'RETAIN',
  INCREASE = 'INCREASE',
}
