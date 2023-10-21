import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CoordinatesFormComponent } from './coordinates-form.component'
import { CoordinatesContext } from 'src/app/services/coordinates.context'
import { provideAnimations } from '@angular/platform-browser/animations'

describe('CoordinatesFormComponent', () => {
  let component: CoordinatesFormComponent
  let fixture: ComponentFixture<CoordinatesFormComponent>
  let context: CoordinatesContext

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoordinatesFormComponent],
      providers: [provideAnimations()],
    })
    fixture = TestBed.createComponent(CoordinatesFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    context = TestBed.inject(CoordinatesContext)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('onFormSubmit', () => {
    it('should notify context if form is valid', () => {
      spyOnProperty(component.formGroup, 'valid').and.returnValue(true)
      spyOn(context, 'sendNewCoordinates')

      component.onFormSubmit()

      expect(context.sendNewCoordinates).toHaveBeenCalled()
    })

    it('should not notify context if form is invalid', () => {
      spyOnProperty(component.formGroup, 'valid').and.returnValue(false)
      spyOn(context, 'sendNewCoordinates')

      component.onFormSubmit()

      expect(context.sendNewCoordinates).not.toHaveBeenCalled()
    })
  })
})
