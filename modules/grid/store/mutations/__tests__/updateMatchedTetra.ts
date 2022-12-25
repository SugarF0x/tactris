import { getInitialTetras } from "~/modules/grid/store/helpers"
import { getGridStoreInitialStateMock } from "~/modules/grid/store/__mocks__"
import { updateMatchedTetra } from "~/modules/grid/store/mutations"

describe('updateMatchedTetra', () => {
  it('should regenerate a new unique tetra in place of given one', () => {
    const tetras = getInitialTetras()

    const { state, draft } = getGridStoreInitialStateMock({ tetras })

    updateMatchedTetra(draft, 0)
    expect(draft.tetras[0]).not.toMatchObject(state.tetras[0])
    expect(draft.tetras[0].type).not.toEqual(state.tetras[0].type)
  })
})
