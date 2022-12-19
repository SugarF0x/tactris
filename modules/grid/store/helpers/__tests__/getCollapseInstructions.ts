import { CompletionLine, GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid"
import * as gridConfig from "~/modules/grid/config"
import { Axis } from "~/modules/position"
import { getCollapseInstructions } from '../getCollapseInstructions'

describe('getCollapseInstructions', () => {
  it.skip.each<[CompletionLine]>([
    [{ axis: Axis.X, value: 0 }],
    [{ axis: Axis.X, value: GRID_WIDTH }],
    [{ axis: Axis.Y, value: 0 }],
    [{ axis: Axis.Y, value: GRID_HEIGHT }],
  ])('should return null for edge lines', (input) => {
    expect(getCollapseInstructions(input)).toBeNull()
  })

  it.skip('should return decremental shift on exact middle completion line given uneven grid dimensions', () => {
    const unevenGridSize = 11
    const median = Math.round(unevenGridSize / 2 + .5)

    const initialGridConfig = { ...gridConfig }
    Object.assign(gridConfig, { GRID_WIDTH: unevenGridSize, GRID_HEIGHT: unevenGridSize })

    expect(getCollapseInstructions({ axis: Axis.X, value: median })).toMatchObject({ axis: Axis.X, value: -1 })
    expect(getCollapseInstructions({ axis: Axis.Y, value: median })).toMatchObject({ axis: Axis.Y, value: -1 })

    Object.assign(gridConfig, initialGridConfig)
  })

  it.skip.each<[CompletionLine, CompletionLine | null]>([
    [{ axis: Axis.X, value: 1 }, { axis: Axis.X, value: 1 }],
    [{ axis: Axis.X, value: 2 }, { axis: Axis.X, value: 1 }],
    [{ axis: Axis.X, value: 2 }, { axis: Axis.X, value: 1 }],
  ])('should return a line with collapse shift axis & direction #%', (input, output) => {
    expect(getCollapseInstructions(input)).toEqual(output)
  })
})
