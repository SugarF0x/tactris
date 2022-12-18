import { CompletionLine, GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid"
import { Axis, PositionId, positionToId } from "~/modules/position"
import { lineToPositionIds } from '../lineToPositionIds'

describe('lineToPositionIds', () => {
  it.each<[CompletionLine, PositionId[]]>([
    [{ axis: Axis.X, value: 0 }, Array.from({ length: GRID_HEIGHT }, (_, y) => positionToId({ x: 0, y }))],
    [{ axis: Axis.X, value: 1 }, Array.from({ length: GRID_HEIGHT }, (_, y) => positionToId({ x: 1, y }))],
    [{ axis: Axis.Y, value: 0 }, Array.from({ length: GRID_WIDTH }, (_, x) => positionToId({ x, y: 0 }))],
    [{ axis: Axis.Y, value: 1 }, Array.from({ length: GRID_WIDTH }, (_, x) => positionToId({ x, y: 1 }))],
  ])('should return all position IDs for given completion line %#', (input, output) => {
    expect(lineToPositionIds(input)).toEqual(expect.arrayContaining(output))
  })
})
