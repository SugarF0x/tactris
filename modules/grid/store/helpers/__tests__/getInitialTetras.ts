import { getInitialTetras } from "~/modules/grid/store/helpers"

describe('getInitialTetras', () => {
  it('should return two unique tetras as available and one unique reserve', () => {
    jest.spyOn(Math, 'random').mockImplementation(() => 0)

    const initialTetras = getInitialTetras()
    const allTetras = [initialTetras.available, initialTetras.reserve].flat()
    const uniqueTetrasLength = new Set(allTetras.map(tetra => JSON.stringify(tetra))).size
    expect(uniqueTetrasLength).toEqual(3)
  })
})
