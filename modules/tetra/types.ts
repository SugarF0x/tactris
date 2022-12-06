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

export type TetraObject = [Position, Position, Position, Position]
