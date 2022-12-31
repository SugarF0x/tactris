import { Position } from "~/utils"

export enum TetraType {
  L = 'L',
  P = 'P',
  Z = 'Z',
  S = 'S',
  I = 'I',
  T = 'T',
  O = 'O',
}

export interface TetraObject {
  type: TetraType
  positions: Position[]
}
