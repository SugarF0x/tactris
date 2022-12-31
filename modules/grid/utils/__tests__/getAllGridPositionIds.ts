import { scopedGridConfigMock } from "~/modules/grid/__mocks__"
import { getAllGridPositionIds } from "~/modules/grid/utils"

describe('getAllGridPositionIds', () => {
  it('should ', () => {
    scopedGridConfigMock({ GRID_WIDTH: 2, GRID_HEIGHT: 3 }, () => {
      expect(getAllGridPositionIds().sort()).toEqual(['0/0', '1/0', '0/1', '1/1', '0/2', '1/2'].sort())
    })
  })
})
