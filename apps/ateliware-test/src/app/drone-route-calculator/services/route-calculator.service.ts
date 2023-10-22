import { Injectable } from '@angular/core'
import { RoutingTimingsGateway } from '../gateways/routing-timings.gateway'
import { Coordinates, RouteResult, buildRouteResult, findFastestRoute } from '@ateliware/shared'
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RouteCalculatorService {
  constructor(private gateway: RoutingTimingsGateway) {}

  async calculateRoute(coordinates: Coordinates): Promise<RouteResult> {
    const graph = await firstValueFrom(this.gateway.getBoardGraph$())
    const pathToObject = findFastestRoute(coordinates.droneStart, coordinates.objectPickup, graph)
    const pathToDelivery = findFastestRoute(coordinates.objectPickup, coordinates.deliveryDestination, graph)

    return buildRouteResult(coordinates, pathToObject, pathToDelivery)
  }
}
