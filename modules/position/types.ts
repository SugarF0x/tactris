export enum Axis {
  X = 'x',
  Y = 'y'
}

export type Position = Record<Axis, number>

export type PositionId = `${number}-${number}`
