import { getGridStoreInitialStateMock } from './mocks'
import { PositionId } from "~/modules/position"
import { selectId } from "~/modules/grid/store/functions"

describe('selectId', () => {
  it.each<[PositionId, PositionId[]]>([
    ['1/1', ['1/1']],
    ['5/5', ['3/5', '5/5', '4/1']],
    ['2/2', ['1/1', '1/2', '2/1', '2/2']],
  ])('should do an early return if the ID is already selected %#', (id, selectedIds) => {
    const { state, draft } = getGridStoreInitialStateMock({ selectedIds })

    selectId(draft, id)

    expect(draft).toMatchObject(state)
  })

  it.each<[PositionId, PositionId[]]>([
    ['3/4', ['3/4']],
    ['1/8', ['3/5', '1/8', '4/2']],
    ['6/7', ['1/1', '2/1', '6/7', '5/2']],
  ])('should do an early return if the ID is already filled %#', (id, filledIds) => {
    const { state, draft } = getGridStoreInitialStateMock({ filledIds })

    selectId(draft, id)

    expect(draft).toMatchObject(state)
  })

  it.each<[PositionId, PositionId[], PositionId[]]>([
    ['1/1', [], ['1/1']],
    ['2/3', ['1/1'], ['1/1', '2/3']],
    ['7/5', ['1/1', '2/3'], ['1/1', '2/3', '7/5']],
    ['0/0', ['1/1', '2/3', '7/5'], ['1/1', '2/3', '7/5', '0/0']],
  ])('should add given ID to the selection array %#', (id, selectedIds, output) => {
    const { state, draft } = getGridStoreInitialStateMock({ selectedIds })

    selectId(draft, id)

    expect(draft).toMatchObject({
      ...state,
      selectedIds: output
    })
  })

  it.each<[PositionId, PositionId[], PositionId[]]>([
    ['5/5', ['1/1', '2/3', '7/5', '0/0'], ['2/3', '7/5', '0/0', '5/5']],
    ['3/7', ['2/3', '7/5', '0/0', '5/5'], ['7/5', '0/0', '5/5', '3/7']],
    ['8/8', ['7/5', '0/0', '5/5', '3/7'], ['0/0', '5/5', '3/7', '8/8']],
  ])('should shift the array if length reaches 5 (%#)', (id, selectedIds, output) => {
    const { state, draft } = getGridStoreInitialStateMock({ selectedIds })

    selectId(draft, id)

    expect(draft).toMatchObject({
      ...state,
      selectedIds: output
    })
  })
})
