import { getInitialTetras } from "~/modules/grid/store/helpers"

describe('getInitialTetras', () => {
  it('should return two unique tetras', () => {
    jest.spyOn(Math, 'random')
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 0)

    const [firstTetra, secondTetra] = getInitialTetras()
    expect(firstTetra).not.toMatchObject(secondTetra)
  })
})
