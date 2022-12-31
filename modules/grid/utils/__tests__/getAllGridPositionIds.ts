import { mockGridConfig } from "~/modules/grid/__mocks__"
import { getAllGridPositionIds } from "~/modules/grid/utils"

describe('getAllGridPositionIds', () => {
  mockGridConfig({ GRID_WIDTH: 2, GRID_HEIGHT: 3 })

  it('should get all IDs for current grid size config', () => {
    expect(getAllGridPositionIds().sort()).toEqual(['0/0', '1/0', '0/1', '1/1', '0/2', '1/2'].sort())
  })

  it('should return cache if function has already done calculations', () => {
    jest.isolateModules(() => {
      const { getAllGridPositionIds } = require("~/modules/grid/utils")

      const pushMock = jest.fn(Array.prototype.push)
      jest.spyOn(Array.prototype, 'push').mockImplementation(pushMock)

      getAllGridPositionIds()
      expect(pushMock).toHaveBeenCalled()

      pushMock.mockClear()
      getAllGridPositionIds()
      expect(pushMock).not.toHaveBeenCalled()
    })
  })
})
