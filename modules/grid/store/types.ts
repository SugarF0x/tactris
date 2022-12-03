export interface Position {
  x: number
  y: number
}

export type PositionId = `${number}-${number}`

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
