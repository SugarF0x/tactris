import { CompletionLine, GRID_HEIGHT, GRID_WIDTH, ShiftInstructions } from "~/modules/grid"
import * as gridConfig from "~/modules/grid/config"
import { Axis } from "~/modules/position"
import { getCollapseInstructions } from '../getCollapseInstructions'

describe('getCollapseInstructions', () => {
  it.each<[CompletionLine]>([
    [{ axis: Axis.X, value: 0 }],
    [{ axis: Axis.X, value: GRID_WIDTH }],
    [{ axis: Axis.Y, value: 0 }],
    [{ axis: Axis.Y, value: GRID_HEIGHT }],
  ])('should return RETAIN for border lines', (input) => {
    expect(getCollapseInstructions(input)).toEqual(ShiftInstructions.RETAIN)
  })

  it('should return decremental shift on exact middle completion line given uneven grid dimensions', () => {
    const unevenGridSize = 11
    const median = Math.round(unevenGridSize / 2 + .5)

    const initialGridConfig = { ...gridConfig }
    Object.assign(gridConfig, { GRID_WIDTH: unevenGridSize, GRID_HEIGHT: unevenGridSize })

    expect(getCollapseInstructions({ axis: Axis.X, value: median })).toEqual(ShiftInstructions.DECREASE)
    expect(getCollapseInstructions({ axis: Axis.Y, value: median })).toEqual(ShiftInstructions.DECREASE)

    Object.assign(gridConfig, initialGridConfig)
  })

  it.each<[CompletionLine, ShiftInstructions]>([
    [{ axis: Axis.X, value: 1 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.X, value: 2 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.X, value: 2 }, ShiftInstructions.INCREASE],
  ])('should return a line with collapse shift axis & direction #%', (input, output) => {
    expect(getCollapseInstructions(input)).toEqual(output)
  })
})
