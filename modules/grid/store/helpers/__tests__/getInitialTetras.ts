import { getInitialTetras } from "~/modules/grid/store/helpers"

describe('getInitialTetras', () => {
  it('should return three unique tetras', () => {
    jest.spyOn(Math, 'random')
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 0)

    const uniqueTetrasLength = new Set(getInitialTetras()).size
    expect(uniqueTetrasLength).toEqual(3)
  })
})
