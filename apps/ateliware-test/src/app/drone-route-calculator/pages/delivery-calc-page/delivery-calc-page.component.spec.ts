import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DeliveryCalcPageComponent } from './delivery-calc-page.component'
import { provideAnimations } from '@angular/platform-browser/animations'

describe('DeliveryCalcPageComponent', () => {
  let component: DeliveryCalcPageComponent
  let fixture: ComponentFixture<DeliveryCalcPageComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeliveryCalcPageComponent],
      providers: [provideAnimations()],
    })
    fixture = TestBed.createComponent(DeliveryCalcPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
