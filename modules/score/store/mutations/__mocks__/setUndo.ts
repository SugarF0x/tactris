import * as module from '~/modules/score/store/mutations/setUndo'

export function mockSetUndo(implementation?: typeof module.setUndo) {
  const mock = jest.fn(implementation ?? module.setUndo)
  jest.spyOn(module,  'setUndo').mockImplementation(mock)
  return mock
}
