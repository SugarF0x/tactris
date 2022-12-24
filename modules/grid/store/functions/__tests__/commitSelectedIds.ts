import { commitSelectedIds } from "~/modules/grid/store/functions"
import { getGridStoreInitialStateMock } from "../__mocks__"
import { getSpecificTetra, TetraObject, TetraType } from "~/modules/tetra"
import { PositionId, positionToId } from "~/modules/position"
import { GRID_WIDTH } from "~/modules/grid"
import * as gridConfig from "~/modules/grid/config"

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
    const tetras = tetraTypes.map(tetra => getSpecificTetra(tetra)) as [TetraObject, TetraObject]
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
    const tetras = tetraTypes.map(tetra => getSpecificTetra(tetra)) as [TetraObject, TetraObject]
    const { draft } = getGridStoreInitialStateMock({ tetras, selectedIds })

    commitSelectedIds(draft)

    expect(draft.filledIds).toEqual(expect.arrayContaining(selectedIds))
    expect(draft.selectedIds).toHaveLength(0)
  })

  it.each<[PositionId[]]>([
    [['9/3', '9/4', '9/5', '9/6']],
    [['9/3', '9/4', '9/6', '9/5']],
  ])('should properly shift specified items from both sides', (fillSelection) => {
    const initialGridConfig = { ...gridConfig }
    Object.assign(gridConfig, { GRID_WIDTH: 10, GRID_HEIGHT: 10 })

    const almostFilledLines = [...Array(4)].flatMap((_, y) => [...Array(GRID_WIDTH - 1)].map((_, x) => positionToId({ x, y: y + 3 })))

    const miscCells: PositionId[] = [
      '0/2', '1/2', '2/2', '3/2',
      '0/7', '1/7', '2/7', '3/7'
    ]

    const expectedFilledState: PositionId[] = [
      '0/4', '1/4', '2/4', '3/4',
      '0/5', '1/5', '2/5', '3/5'
    ]

    const { draft } = getGridStoreInitialStateMock({
      tetras: [getSpecificTetra(TetraType.T), getSpecificTetra(TetraType.I)],
      selectedIds: fillSelection,
      filledIds: [
        ...almostFilledLines,
        ...miscCells
      ]
    })

    commitSelectedIds(draft)

    expect(draft.filledIds.sort()).toEqual(expectedFilledState.sort())

    Object.assign(gridConfig, initialGridConfig)
  })
})
