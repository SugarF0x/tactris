export function exhaust(...value: never[]): never {
  throw new Error(`ERR: Unreachable function called with unexpected arguments: \n${JSON.stringify(value, null, 2)}`)
}
