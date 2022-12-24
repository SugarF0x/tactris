import { Position } from "~/modules/position"

export enum TetraType {
  L = 'L',
  P = 'P',
  Z = 'Z',
  S = 'S',
  I = 'I',
  T = 'T',
  O = 'O',
}

// TODO: update tetra object to replace positions with rotation

export interface TetraObject {
  type: TetraType
  positions: Position[]
}
