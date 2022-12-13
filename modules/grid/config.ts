import { Axis, Position } from "~/modules/position"

export const GRID_WIDTH = 10
export const GRID_HEIGHT = 10

export const axisToGridSizeMap: Position = {
  [Axis.X]: GRID_WIDTH,
  [Axis.Y]: GRID_HEIGHT,
}
