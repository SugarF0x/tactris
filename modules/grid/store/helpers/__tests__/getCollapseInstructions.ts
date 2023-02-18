import { CompletionLine, ShiftInstructions } from "~/modules/grid/types"
import { GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid/config"
import * as gridConfig from "~/modules/grid/config"
import { Axis } from "~/utils"
import { getCollapseInstructions } from '../getCollapseInstructions'
import { mockGridConfig, scopedGridConfigMock } from "~/modules/grid/__mocks__"

describe('getCollapseInstructions', () => {
  mockGridConfig()

  it.each<[CompletionLine]>([
    [{ axis: Axis.X, value: 0 }],
    [{ axis: Axis.X, value: GRID_WIDTH - 1 }],
    [{ axis: Axis.Y, value: 0 }],
    [{ axis: Axis.Y, value: GRID_HEIGHT - 1 }],
  ])('should return RETAIN for border lines', (input) => {
    expect(getCollapseInstructions(input)).toEqual(ShiftInstructions.RETAIN)
  })

  it('should return decremental shift on exact middle completion line given uneven grid dimensions', () => {
    const unevenGridSize = 11

    scopedGridConfigMock({ GRID_WIDTH: unevenGridSize, GRID_HEIGHT: unevenGridSize }, () => {
      const median = Math.round(unevenGridSize / 2 + .5)

      expect(getCollapseInstructions({ axis: Axis.X, value: median })).toEqual(ShiftInstructions.DECREASE)
      expect(getCollapseInstructions({ axis: Axis.Y, value: median })).toEqual(ShiftInstructions.DECREASE)
    })
  })

  it('should return proper directions on exact middle', () => {
    const initialGridConfig = { ...gridConfig }
    Object.assign(gridConfig, { GRID_WIDTH: 10, GRID_HEIGHT: 10 })

    expect(getCollapseInstructions({ axis: Axis.Y, value: 5 })).toEqual(ShiftInstructions.DECREASE)
    expect(getCollapseInstructions({ axis: Axis.Y, value: 4 })).toEqual(ShiftInstructions.INCREASE)

    Object.assign(gridConfig, initialGridConfig)
  })

  it.each<[CompletionLine, ShiftInstructions]>([
    [{ axis: Axis.X, value: 1 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.X, value: 2 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.X, value: 2 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.X, value: 4 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.X, value: Math.floor(GRID_WIDTH / 2 - 1) }, ShiftInstructions.INCREASE],

    [{ axis: Axis.Y, value: 1 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.Y, value: 2 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.Y, value: 2 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.Y, value: 4 }, ShiftInstructions.INCREASE],
    [{ axis: Axis.Y, value: Math.floor(GRID_HEIGHT / 2 - 1) }, ShiftInstructions.INCREASE],

    [{ axis: Axis.X, value: GRID_WIDTH - 2 }, ShiftInstructions.DECREASE],
    [{ axis: Axis.X, value: GRID_WIDTH - 3 }, ShiftInstructions.DECREASE],
    [{ axis: Axis.X, value: GRID_WIDTH - 4 }, ShiftInstructions.DECREASE],
    [{ axis: Axis.X, value: GRID_WIDTH - 5 }, ShiftInstructions.DECREASE],
    [{ axis: Axis.X, value: Math.floor(GRID_WIDTH / 2 + 1) }, ShiftInstructions.DECREASE],

    [{ axis: Axis.Y, value: GRID_WIDTH - 2 }, ShiftInstructions.DECREASE],
    [{ axis: Axis.Y, value: GRID_WIDTH - 3 }, ShiftInstructions.DECREASE],
    [{ axis: Axis.Y, value: GRID_WIDTH - 4 }, ShiftInstructions.DECREASE],
    [{ axis: Axis.Y, value: GRID_WIDTH - 5 }, ShiftInstructions.DECREASE],
    [{ axis: Axis.Y, value: Math.floor(GRID_HEIGHT / 2 + 1) }, ShiftInstructions.DECREASE],
  ])('should return shift instructions %#', (input, output) => {
    expect(getCollapseInstructions(input)).toEqual(output)
  })
})
