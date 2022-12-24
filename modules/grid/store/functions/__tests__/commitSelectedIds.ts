import { commitSelectedIds } from "~/modules/grid/store/functions"
import { getGridStoreInitialStateMock } from "./mocks"
import { getSpecificTetra, TetraObject, TetraType } from "~/modules/tetra"
import { PositionId } from "~/modules/position"

describe('commitSelectedIds', () => {
  it('should do early return on selected IDs length < 4 (%#)', () => {
    const { state, draft } = getGridStoreInitialStateMock()

    commitSelectedIds(draft)

    expect(draft).toMatchObject(state)
  })

  it.each<[[TetraType, TetraType], PositionId[]]>([
    [
      [TetraType.I, TetraType.O],
      ['1/1', '2/2', '3/3', '4/4']
    ],
    [
      [TetraType.L, TetraType.P],
      ['0/0', '0/1', '0/2', '0/3']
    ],
    [
      [TetraType.T, TetraType.Z],
      ['5/0', '3/2', '7/5', '4/4']
    ],
  ])('should do early return if selection does not match either tetra %#', (tetraTypes, selectedIds) => {
    const tetras = tetraTypes.map(getSpecificTetra) as [TetraObject, TetraObject]
    const { state, draft } = getGridStoreInitialStateMock({ tetras, selectedIds })

    commitSelectedIds(draft)

    expect(draft).toMatchObject(state)
  })

  it.each<[[TetraType, TetraType], PositionId[]]>([
    [
      [TetraType.I, TetraType.O],
      ['0/0', '0/1', '0/2', '0/3']
    ],
    [
      [TetraType.I, TetraType.O],
      ['0/0', '0/1', '1/0', '1/1']
    ],
    [
      [TetraType.S, TetraType.L],
      ['5/5', '5/6', '5/7', '6/7']
    ]
  ])('should append selectedIds to filledIds on successful match & clear selection %#', (tetraTypes, selectedIds) => {
    const tetras = tetraTypes.map(getSpecificTetra) as [TetraObject, TetraObject]
    const { draft } = getGridStoreInitialStateMock({ tetras, selectedIds })

    commitSelectedIds(draft)

    expect(draft.filledIds).toEqual(expect.arrayContaining(selectedIds))
    expect(draft.selectedIds).toHaveLength(0)
  })
})
