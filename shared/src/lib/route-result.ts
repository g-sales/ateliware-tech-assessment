import { Coordinates } from './coordinates'
import { Route } from './find-fastest-route'

export interface RouteResult {
  coordinates: Coordinates
  totalTime: string
  fullPath: string[]
}

export function buildRouteResult(coordinates: Coordinates, pathToObject: Route, pathToDelivery: Route) {
  return {
    coordinates,
    totalTime: (pathToDelivery.totalTime + pathToObject.totalTime).toFixed(2),
    fullPath: [...pathToObject.coords, ...pathToDelivery.coords.slice(1)],
  }
}
