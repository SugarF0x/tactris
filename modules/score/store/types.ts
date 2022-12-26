export interface ScoreStore {
  score: number
  highScore: number
  setScore: (value: number) => void
}
