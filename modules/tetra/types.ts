export enum TetraType {
  L = 'L',
  P = 'P',
  Z = 'Z',
  S = 'S',
  I = 'I',
  T = 'T',
  O = 'O',
}

export type TetraRotation =
  | 0
  | 1
  | 2
  | 3

export interface TetraObject {
  type: TetraType
  rotation: TetraRotation
}
