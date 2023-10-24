import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouteResultComponent } from './route-result.component'

describe('RouteResultComponent', () => {
  let component: RouteResultComponent
  let fixture: ComponentFixture<RouteResultComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteResultComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(RouteResultComponent)
    component = fixture.componentInstance

    component.routeResult = {
      coordinates: {
        droneStart: 'A1',
        objectPickup: 'B1',
        deliveryDestination: 'C1',
      },
      fullPath: ['A1', 'B1', 'C1'],
      totalTime: '3.2',
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
