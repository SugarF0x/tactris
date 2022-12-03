export interface Position {
  x: number
  y: number
}

export type PositionId = `${number}-${number}`

export function isPositionId(val: string): val is PositionId {
  const [x, y] = val.split('-')
  return !(isNaN(Number(x)) || isNaN((Number(y))))
}

export function idToPosition(id: PositionId): Position {
  const [x, y] = id.split('-').map(Number)
  return { x, y }
}

export function positionToId(pos: Position): PositionId {
  const { x, y } = pos
  return `${x}-${y}`
}

export interface GridCell {
  id: PositionId
  isFilled: boolean
  isSelected: boolean
}

export type Tetra = [Position, Position, Position, Position]

export interface GridStore {
  cells: Record<PositionId, GridCell>
  tetras: [Tetra, Tetra]
}
