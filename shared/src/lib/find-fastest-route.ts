import { BoardGraph } from './board-graph'

const possibleMovements2 = [goUp, goDown, goRight, goLeft]

export type Path = {
  totalTime: number
  coords: string[]
}

function addCoordToPath(path: Path, graph: BoardGraph, newCoord: string) {
  const lastCoord = path.coords[path.coords.length - 1]
  const timeBetweenCoords = graph[lastCoord][newCoord]

  return {
    coords: path.coords.concat(newCoord),
    totalTime: path.totalTime + timeBetweenCoords,
  }
}

const StartingLetterCharCode = 'A'.charCodeAt(0)

export function findFastestRoute(start: string, end: string, boardSize: number, graph: BoardGraph): Path {
  let fastestPath: Path

  function isValid(coord: string): boolean {
    const [letter, number] = coord.split('')
    const letterIndex = letter.charCodeAt(0) - StartingLetterCharCode
    const numberIndex = parseInt(number) - 1
    return letterIndex >= 0 && letterIndex < boardSize && numberIndex >= 0 && numberIndex < boardSize
  }

  function dfs(currentPoint: string, currentPath: Path): void {
    if (fastestPath && currentPath.totalTime > fastestPath.totalTime) {
      return
    }

    if (currentPoint === end) {
      fastestPath = currentPath
    }

    for (const movementFn of possibleMovements2) {
      const nextPoint = movementFn(currentPoint)

      if (
        isValid(nextPoint) &&
        currentPath.coords.every((coord) => coord[0] !== nextPoint[0] || coord[1] !== nextPoint[1])
      ) {
        dfs(nextPoint, addCoordToPath(currentPath, graph, nextPoint))
      }
    }
  }

  dfs(start, {
    coords: [start],
    totalTime: 0,
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return fastestPath!
}

function goUp(coord: string): string {
  const [letter, number] = coord.split('')
  return `${letter}${parseInt(number) + 1}`
}

function goDown(coord: string): string {
  const [letter, number] = coord.split('')
  return `${letter}${parseInt(number) - 1}`
}

function goRight(coord: string): string {
  const [letter, number] = coord.split('')
  return `${String.fromCharCode(letter.charCodeAt(0) + 1)}${number}`
}

function goLeft(coord: string): string {
  const [letter, number] = coord.split('')
  return `${String.fromCharCode(letter.charCodeAt(0) - 1)}${number}`
}
