import { DeliveryCalcPageComponent } from './delivery-calc-page.component'
import { MockBuilder, MockRender, MockedComponentFixture } from 'ng-mocks'

describe('DeliveryCalcPageComponent', () => {
  let component: DeliveryCalcPageComponent
  let fixture: MockedComponentFixture<DeliveryCalcPageComponent>

  beforeEach(async () => {
    await MockBuilder(DeliveryCalcPageComponent)
    fixture = MockRender('<delivery-calc-page></delivery-calc-page>')

    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
