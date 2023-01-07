import { TetraType } from "~/modules/tetra"
import { PositionId } from "~/utils"
import { mockGridConfig } from "~/modules/grid/__mocks__"
import { getAvailableTetraPosition } from "~/modules/grid/utils"

describe('getAvailableTetraPosition', () => {
  mockGridConfig({ GRID_WIDTH: 4, GRID_HEIGHT: 4 })

  it.each<[TetraType, PositionId[]]>([
    [TetraType.I, ['0/0','1/0','2/0','3/0']],
    [TetraType.L, ['0/1','1/2','2/3','3/0', '2/0']],
    [TetraType.O, ['1/1','3/1','1/3', '3/3']],
  ])('should return null when no position is available %#', (type, filled) => {
    expect(getAvailableTetraPosition({ type, rotation: 0 }, filled)).toBeNull()
  })

  it.each<[TetraType, PositionId[], PositionId[]]>([
    [TetraType.I, [], ['0/0','0/1','0/2','0/3']],
    [TetraType.I, ['1/1'], ['0/0','0/1','0/2','0/3']],
    [TetraType.I, ['0/0'], ['1/0','1/1','1/2','1/3']],
    [TetraType.O, ['0/1','0/2','3/1','3/2','2/0','3/3'], ['1/1','1/2','2/1','2/2']],
  ])('should return first encountered possible position ids %#', (type, filled, output) => {
    expect(getAvailableTetraPosition({ type, rotation: 0 }, filled)?.sort()).toEqual(output.sort())
  })
})
