import { updateScore } from "~/modules/score/store/functions"
import { mockGridConfig } from "~/modules/grid/__mocks__"
import { mockCompletionsToScore } from "~/modules/score/store/helpers/__mocks__"
import { mockSetScore, mockSetHighScore } from "~/modules/score/store/mutations/__mocks__"
import { CompletionLine } from "~/modules/grid"
import { Axis } from "~/utils"
import { mockRootStore } from "~/services/store/__mocks__"

describe('updateScore', () => {
  mockGridConfig()

  const completionsToScoreMock = mockCompletionsToScore()
  const setScoreMock = mockSetScore()
  const setHighScoreMock = mockSetHighScore()

  it('should calculate additional score and increase score state', () => {
    const lines: CompletionLine[] = [
      { axis: Axis.X, value: 3 },
      { axis: Axis.Y, value: 6 }
    ]

    const MOCK_HIGH_SCORE_VALUE = 5000
    const { state, draft } = mockRootStore({ highScore: MOCK_HIGH_SCORE_VALUE })

    updateScore(draft, lines)

    expect(completionsToScoreMock).toHaveBeenCalledWith(lines)
    expect(setScoreMock).toHaveBeenCalledWith(draft, completionsToScoreMock.mock.results[0].value)
    expect(setHighScoreMock).toHaveBeenCalledWith(draft, state.highScore)
  })

  it('should update high score should score be greater than that', () => {
    const lines: CompletionLine[] = [
      { axis: Axis.X, value: 3 },
      { axis: Axis.X, value: 6 },
      { axis: Axis.Y, value: 3 },
      { axis: Axis.Y, value: 6 },
    ]

    const MOCK_SCORE_CALCULATION_RESULT = 30
    const completionsToScoreMock = mockCompletionsToScore(() => MOCK_SCORE_CALCULATION_RESULT)

    const { draft } = mockRootStore()

    updateScore(draft, lines)

    expect(setHighScoreMock).toHaveBeenCalledWith(draft, completionsToScoreMock.mock.results[0].value)
  })
})
