import { getInitialTetras } from "~/modules/grid/store/helpers"

describe('getInitialTetras', () => {
  it('should return two unique tetras as available and one unique reserve', () => {
    jest.spyOn(Math, 'random')
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 0)

    const initialTetras = getInitialTetras()
    const uniqueTetraTypesLength = new Set([...initialTetras.available.map(tetra => tetra.type), initialTetras.reserve.type]).size
    expect(uniqueTetraTypesLength).toEqual(3)
  })
})
