import { _commitSelectedIds } from "~/modules/grid/store/functions"
import { getGridStoreInitialStateMock } from "~/modules/grid/store/__mocks__"
import { getRandomTetra, TetraObject, TetraType } from "~/modules/tetra"
import { Axis, PositionId, positionToId } from "~/utils"
import { GRID_WIDTH } from "~/modules/grid"
import { mockGridConfig } from "~/modules/grid/__mocks__"

describe('commitSelectedIds', () => {
  mockGridConfig()

  it('should do early return on selected IDs length < 4', () => {
    const { state, draft } = getGridStoreInitialStateMock()

    _commitSelectedIds(draft)

    expect(draft).toMatchObject(state)
  })

  it('should update matched tetra', () => {
    const tetras: [TetraObject, TetraObject] = [{ type: TetraType.I, rotation: 0 }, getRandomTetra([{ type: TetraType.I, rotation: 0 }])]
    const selectedIds: PositionId[] = ['4/4', '4/5', '4/6', '4/7']

    const { state, draft } = getGridStoreInitialStateMock({ tetras: { available: tetras }, selectedIds })

    _commitSelectedIds(draft)

    expect(draft.tetras.available[0]).not.toMatchObject(state.tetras.available[0])
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
    const tetras = tetraTypes.map(type => ({ type, rotation: 0 })) as [TetraObject, TetraObject]
    const { state, draft } = getGridStoreInitialStateMock({ tetras: { available: tetras }, selectedIds })

    _commitSelectedIds(draft)

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
    const tetras = tetraTypes.map(type => ({ type, rotation: 0 })) as [TetraObject, TetraObject]
    const { draft } = getGridStoreInitialStateMock({ tetras: { available: tetras }, selectedIds })

    _commitSelectedIds(draft)

    expect(draft.filledIds).toEqual(expect.arrayContaining(selectedIds))
    expect(draft.selectedIds).toHaveLength(0)
  })

  it.each<[PositionId[]]>([
    [['9/3', '9/4', '9/5', '9/6']],
    [['9/3', '9/4', '9/6', '9/5']],
  ])('should properly shift specified items from both sides %#', (fillSelection) => {
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
      tetras: {
        available: [{ type: TetraType.T, rotation: 0 }, { type: TetraType.I, rotation: 0 }]
      },
      selectedIds: fillSelection,
      filledIds: [
        ...almostFilledLines,
        ...miscCells
      ]
    })

    _commitSelectedIds(draft)

    expect(draft.filledIds.sort()).toEqual(expectedFilledState.sort())
  })

  it('should return completed lines array', () => {
    const { draft } = getGridStoreInitialStateMock({
      filledIds: Array.from({ length: GRID_WIDTH - 1 }, (_, y) => positionToId({ x: 0, y: y + 1 })),
      selectedIds: ['0/0', '0/1', '0/2', '0/3'],
      tetras: {
        available: [{ type: TetraType.I, rotation: 0 }, getRandomTetra([{ type: TetraType.I, rotation: 0 }])]
      }
    })

    const lines = _commitSelectedIds(draft)

    expect(lines).toEqual([{ axis: Axis.X, value: 0 }])
  })
})
