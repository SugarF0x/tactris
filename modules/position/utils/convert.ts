import { Position, PositionId } from "../types"

export function idToPosition(id: PositionId): Position {
  const [x, y] = id.split('/').map(Number)
  return { x, y }
}

export function positionToId(pos: Position): PositionId {
  const { x, y } = pos
  return `${x}/${y}`
}
