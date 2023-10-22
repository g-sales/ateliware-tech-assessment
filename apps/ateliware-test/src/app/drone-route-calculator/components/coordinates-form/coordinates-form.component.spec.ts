import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CoordinatesFormComponent } from './coordinates-form.component'
import { provideAnimations } from '@angular/platform-browser/animations'
import { CoordinatesContext } from '../../contexts/coordinates.context'
import { MockProviders } from 'ng-mocks'
import { RouteCalculatorService } from '../../services/route-calculator.service'

describe('CoordinatesFormComponent', () => {
  let component: CoordinatesFormComponent
  let fixture: ComponentFixture<CoordinatesFormComponent>
  let context: CoordinatesContext
  let calculateService: RouteCalculatorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoordinatesFormComponent],
      providers: [provideAnimations(), ...MockProviders(RouteCalculatorService, CoordinatesContext)],
    })
    fixture = TestBed.createComponent(CoordinatesFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    context = TestBed.inject(CoordinatesContext)
    calculateService = TestBed.inject(RouteCalculatorService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('onFormSubmit', () => {
    beforeEach(() => {
      jest.spyOn(context, 'sendNewCoordinates')
      jest.spyOn(calculateService, 'calculateRoute')
    })

    it('should calculate route if form is valid and is not calculating', () => {
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(true)

      component.calculating = false
      component.onFormSubmit()

      expect(context.sendNewCoordinates).toHaveBeenCalled()
      expect(calculateService.calculateRoute).toHaveBeenCalled()
    })

    it('should not calculate if form is invalid', async () => {
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(false)

      await component.onFormSubmit()

      expect(context.sendNewCoordinates).not.toHaveBeenCalled()
      expect(calculateService.calculateRoute).not.toHaveBeenCalled()
    })

    it('should not calculate if form is valid but its already calculating', async () => {
      jest.spyOn(component.formGroup, 'valid', 'get').mockReturnValue(false)

      component.calculating = true
      await component.onFormSubmit()

      expect(context.sendNewCoordinates).not.toHaveBeenCalled()
      expect(calculateService.calculateRoute).not.toHaveBeenCalled()
    })
  })
})
