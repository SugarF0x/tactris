import * as module from '~/modules/score/store/mutations/setScore'

export function mockSetScore(implementation?: typeof module.setScore) {
  const mock = jest.fn(implementation ?? module.setScore)
  jest.spyOn(module,  'setScore').mockImplementation(mock)
  return mock
}
