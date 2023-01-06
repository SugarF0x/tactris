import { getInitialTetras } from "~/modules/grid/store/helpers"
import { getGridStoreInitialStateMock } from "~/modules/grid/store/__mocks__"
import { updateMatchedTetra } from "~/modules/grid/store/mutations"

describe('updateMatchedTetra', () => {
  it('should replace matched tetra with a backup one on the second index', () => {
    const tetras = getInitialTetras()

    const { state, draft } = getGridStoreInitialStateMock({ tetras })

    updateMatchedTetra(draft, 0)
    expect(draft.tetras[0]).toEqual(state.tetras[2])
  })

  it('should generate a new unique tetra in the reserve slot keeping unmatched tetra intact', () => {
    const tetras = getInitialTetras()

    const { state, draft } = getGridStoreInitialStateMock({ tetras })

    updateMatchedTetra(draft, 0)
    expect(draft.tetras[2]).not.toEqual(state.tetras[2])
    expect(draft.tetras[1]).toEqual(state.tetras[1])
  })
})
