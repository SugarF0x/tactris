export const getCanAffordUndo = (currentScore: number, previousScore: number, undoCost: number, didCollect: boolean): boolean => {
  if (didCollect) return previousScore - undoCost >= 0
  else return currentScore - undoCost >= 0
}
