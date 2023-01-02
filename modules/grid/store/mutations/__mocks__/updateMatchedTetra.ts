import * as module from '~/modules/grid/store/mutations/updateMatchedTetra'

export function mockUpdateMatchedTetra(implementation?: typeof module.updateMatchedTetra) {
  const mock = jest.fn(implementation ?? module.updateMatchedTetra)
  jest.spyOn(module,  'updateMatchedTetra').mockImplementation(mock)
  return mock
}
