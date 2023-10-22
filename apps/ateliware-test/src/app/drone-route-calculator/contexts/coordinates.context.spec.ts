import { TestBed } from '@angular/core/testing'

import { CoordinatesContext } from './coordinates.context'

describe('ContextService', () => {
  let service: CoordinatesContext

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(CoordinatesContext)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should notify listeners when a new coordinate is sent', () => {
    const listener = jest.fn()
    service.coordinates$.subscribe(listener)

    service.sendNewCoordinates({
      droneStart: 'B1',
      objectPickup: 'C1',
      deliveryDestination: 'A1',
    })

    expect(listener).toHaveBeenCalled()
  })
})
