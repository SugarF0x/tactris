import { Position } from "~/modules/position"
import { GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid/config"

// TODO: add option to floor to top/bottom left/right at given grid size
//  & use it in tetra hud display to space them out evenly to the center

export function floorTetra(tetra: Position[]): Position[] {
  const [minX, minY] = tetra.reduce((acc, val) => {
    acc[0] = Math.min(val.x, acc[0])
    acc[1] = Math.min(val.y, acc[1])
    return acc
  }, [GRID_WIDTH, GRID_HEIGHT])

  return tetra.map(pos => {
    pos.x -= minX
    pos.y -= minY
    return pos
  })
}
