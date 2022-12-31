import { mockGridConfig } from "~/modules/grid/__mocks__"
import { CompletionLine } from "~/modules/grid"
import { completionsToScore } from "~/modules/score/store/helpers/completionsToScore"
import { Axis } from "~/utils"

describe('completionsToScore', () => {
  mockGridConfig()

  it.each<[number, number]>([
    [0, 0],
    [1, 10],
    [2, 30],
    [3, 60],
    [4, 100],
  ])('should calculate score based on completions & grid config %d', (completions, output) => {
    const input: CompletionLine[] = Array(completions).fill({ axis: Axis.X, value: 3 })
    expect(completionsToScore(input)).toEqual(output)
  })
})
