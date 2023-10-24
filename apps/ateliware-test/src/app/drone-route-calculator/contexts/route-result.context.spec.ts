import { TestBed } from '@angular/core/testing'

import { RouteResultsContext, storageLimit } from './route-result.context'
import { RouteResult } from '@ateliware/shared'

describe('ContextService', () => {
  let service: RouteResultsContext

  const mockResult: RouteResult = {
    coordinates: {
      deliveryDestination: '',
      droneStart: '',
      objectPickup: '',
    },
    fullPath: [],
    totalTime: '',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(RouteResultsContext)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should notify listeners when a result is stored', () => {
    const listener = jest.fn()
    service.routes$.subscribe(listener)
    listener.mockReset()

    service.storeResult(mockResult)

    expect(listener).toHaveBeenCalled()
  })

  it('should store not more routes than the limit', () => {
    Array(storageLimit)
      .fill(1)
      .forEach(() => {
        service.storeResult(mockResult)
      })

    const listener = jest.fn()
    service.routes$.subscribe(listener)

    listener.mockReset()

    service.storeResult(mockResult)

    const lastCallArgs: RouteResult[] = listener.mock.lastCall[0]
    expect(lastCallArgs.length).toBe(storageLimit)
  })
})
