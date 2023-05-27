import * as selectors from "~/modules/score/store/selectors"

export function getUndoCostMock(value: ReturnType<typeof selectors.getUndoCost>) {
  const mock = jest.fn(() => value)
  jest.spyOn(selectors,  'getUndoCost').mockImplementation(mock)
  return mock
}
