import { MockBuilder } from 'ng-mocks'
import { RouteCalculatorService } from './route-calculator.service'
import { TestBed } from '@angular/core/testing'
import { RoutingTimingsGateway } from '../gateways/routing-timings.gateway'
import * as shared from '@ateliware/shared'
import { of } from 'rxjs'

jest.mock('@ateliware/shared', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@ateliware/shared'),
  }
})

describe('RouteCalculatorService', () => {
  let service: RouteCalculatorService

  beforeEach(async () => {
    await MockBuilder(RouteCalculatorService)
    service = TestBed.inject(RouteCalculatorService)
  })

  it('should create an instance', () => {
    expect(service).toBeTruthy()
  })

  describe('calculateRoute', () => {
    it('should calculate routes from start to object and from object to destination', async () => {
      const getGraphSpy = jest.spyOn(TestBed.inject(RoutingTimingsGateway), 'getBoardGraph$').mockReturnValue(of({}))
      const algorithmSpy = jest.spyOn(shared, 'findFastestRoute').mockReturnValue({
        coords: [],
        totalTime: 0,
      })

      const result = await service.calculateRoute({
        deliveryDestination: 'A1',
        droneStart: 'B3',
        objectPickup: 'C6',
      })

      expect(result).toBeDefined()
      expect(result.coordinates).toBeDefined()
      expect(result.fullPath).toBeDefined()
      expect(result.totalTime).toBeDefined()
      expect(getGraphSpy).toBeCalled()
      expect(algorithmSpy).toBeCalledTimes(2)
    })
  })
})
