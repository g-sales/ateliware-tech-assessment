import { StartingLetterCharCode } from './board-config'

export function generateBoardPoints(boardSize: number) {
  return Array(boardSize)
    .fill(null)
    .flatMap((_, index) => {
      const letter = String.fromCharCode(StartingLetterCharCode + index)
      return [...Array(boardSize).keys()].map((number) => `${letter}${number + 1}`)
    })
}
