import { BoardGraph } from './board-graph'

export type Route = {
  totalTime: number
  coords: string[]
}

function addCoordToPath(path: Route, graph: BoardGraph, newCoord: string) {
  const lastCoord = path.coords[path.coords.length - 1]
  const timeBetweenCoords = graph[lastCoord][newCoord]

  return {
    coords: path.coords.concat(newCoord),
    totalTime: path.totalTime + timeBetweenCoords,
  }
}

const StartingLetterCharCode = 'A'.charCodeAt(0)

const possibleMovements = [goUp, goRight, goDown, goLeft]

export function findFastestRoute(start: string, end: string, graph: BoardGraph): Route {
  const boardSize = Math.sqrt(Object.keys(graph).length)
  let fastestRoute: Route = findSmallestRoute(start, end, graph)

  if (!isValid(start, boardSize)) {
    throw new Error(`Starting cell ${start} is not valid for board of size ${boardSize}`)
  }

  if (!isValid(end, boardSize)) {
    throw new Error(`Ending cell ${start} is not valid for board of size ${boardSize}`)
  }

  function dfs(currentPoint: string, currentPath: Route): void {
    if (currentPoint === end) {
      console.log(`New fastest route found`)
      fastestRoute = currentPath
      return
    }

    if (fastestRoute && currentPath.totalTime > fastestRoute.totalTime) {
      console.count(`Route not faster than one already found. Aborting`)
      return
    }

    for (const movementFn of possibleMovements) {
      const nextPoint = movementFn(currentPoint)

      if (isValid(nextPoint, boardSize) && !currentPath.coords.includes(nextPoint)) {
        dfs(nextPoint, addCoordToPath(currentPath, graph, nextPoint))
      }
    }
  }

  dfs(start, {
    coords: [start],
    totalTime: 0,
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return fastestRoute!
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

function isValid(coord: string, boardSize: number): boolean {
  const [letter, number] = coord.split('')
  const letterIndex = letter.charCodeAt(0) - StartingLetterCharCode
  const numberIndex = parseInt(number) - 1
  return letterIndex >= 0 && letterIndex < boardSize && numberIndex >= 0 && numberIndex < boardSize
}

function findSmallestRoute(start: string, end: string, graph: BoardGraph) {
  const horizontalDiff = end.charCodeAt(0) - start.charCodeAt(0)
  const verticalDiff = parseInt(end[1]) - parseInt(start[1])

  const verticalMovement = verticalDiff > 0 ? goUp : goDown
  const horizontalMovement = horizontalDiff > 0 ? goRight : goLeft

  let horizontalFirstRoute: Route = {
    coords: [start],
    totalTime: 0,
  }

  let currentPoint = start
  Array(Math.abs(horizontalDiff))
    .fill(1)
    .forEach(() => {
      horizontalFirstRoute = addCoordToPath(horizontalFirstRoute, graph, horizontalMovement(currentPoint))
      currentPoint = horizontalFirstRoute.coords[horizontalFirstRoute.coords.length - 1]
    })

  Array(Math.abs(verticalDiff))
    .fill(1)
    .forEach(() => {
      horizontalFirstRoute = addCoordToPath(horizontalFirstRoute, graph, verticalMovement(currentPoint))
      currentPoint = horizontalFirstRoute.coords[horizontalFirstRoute.coords.length - 1]
    })

  let verticalFirstRoute: Route = {
    coords: [start],
    totalTime: 0,
  }
  currentPoint = start
  Array(Math.abs(verticalDiff))
    .fill(1)
    .forEach(() => {
      verticalFirstRoute = addCoordToPath(verticalFirstRoute, graph, verticalMovement(currentPoint))
      currentPoint = verticalFirstRoute.coords[verticalFirstRoute.coords.length - 1]
    })

  Array(Math.abs(horizontalDiff))
    .fill(1)
    .forEach(() => {
      verticalFirstRoute = addCoordToPath(verticalFirstRoute, graph, horizontalMovement(currentPoint))
      currentPoint = verticalFirstRoute.coords[verticalFirstRoute.coords.length - 1]
    })

  if (verticalFirstRoute.totalTime < horizontalFirstRoute.totalTime) {
    return verticalFirstRoute
  }

  return horizontalFirstRoute
}
