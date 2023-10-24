import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CoordinatesFormComponent } from './coordinates-form.component'
import { provideAnimations } from '@angular/platform-browser/animations'
import { RouteResultsContext } from '../../contexts/route-result.context'
import { MockProviders } from 'ng-mocks'
import { RouteCalculatorService } from '../../services/route-calculator.service'
import { RouteResult } from '@ateliware/shared'

describe('CoordinatesFormComponent', () => {
  let component: CoordinatesFormComponent
  let fixture: ComponentFixture<CoordinatesFormComponent>
  let context: RouteResultsContext
  let calculateService: RouteCalculatorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoordinatesFormComponent],
      providers: [provideAnimations(), ...MockProviders(RouteCalculatorService, RouteResultsContext)],
    })
    fixture = TestBed.createComponent(CoordinatesFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    context = TestBed.inject(RouteResultsContext)
    calculateService = TestBed.inject(RouteCalculatorService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('onFormSubmit', () => {
    beforeEach(() => {
      jest.spyOn(context, 'storeResult')
      jest.spyOn(calculateService, 'calculateRoute').mockResolvedValue({} as RouteResult)
    })

    it('should calculate route if form is valid and is not calculating', async () => {
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(true)

      component.calculating = false
      await component.onFormSubmit()

      expect(calculateService.calculateRoute).toHaveBeenCalled()
    })

    it('should not calculate if form is invalid', async () => {
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(false)

      await component.onFormSubmit()

      expect(calculateService.calculateRoute).not.toHaveBeenCalled()
    })

    it('should not calculate if form is valid but its already calculating', async () => {
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(true)

      component.calculating = true
      await component.onFormSubmit()

      expect(calculateService.calculateRoute).not.toHaveBeenCalled()
    })
  })
})
