import { getInitialTetras } from "~/modules/grid/store/helpers"
import { getGridStoreInitialStateMock } from "~/modules/grid/store/__mocks__"
import { updateMatchedTetra } from "~/modules/grid/store/mutations"

describe('updateMatchedTetra', () => {
  const tetras = getInitialTetras()
  const { state, draft } = getGridStoreInitialStateMock({ tetras })
  updateMatchedTetra(draft, 0)

  it('should replace matched tetra with reserve tetra', () => {
    expect(draft.tetras.available[0]).toEqual(state.tetras.reserve)
  })

  it('should generate a new unique reserve tetra', () => {
    expect(draft.tetras.reserve).not.toEqual(expect.arrayContaining([state.tetras.available, state.tetras.reserve].flat()))
  })
})
