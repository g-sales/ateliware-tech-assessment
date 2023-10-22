import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { Coordinates } from '@ateliware/shared'
import { UppercaseInputDirective } from '../../directives/uppercase-input.directive'
import { CoordinatesContext } from '../../contexts/coordinates.context'
import { RouteCalculatorService } from '../../services/route-calculator.service'
import { MatProgressBarModule } from '@angular/material/progress-bar'

type CoordinatesFormGroup = {
  [key in keyof Coordinates]: FormControl<Coordinates[key]>
}

const numberOfCharactersInPoint = 2

const coordinateInputValidators = [
  Validators.required,
  Validators.maxLength(numberOfCharactersInPoint),
  Validators.minLength(numberOfCharactersInPoint),
  // pointValidator,
]

interface CalculationViewItem {
  fullPath: string[]
  totalTime: string
}

@Component({
  selector: 'coordinates-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    UppercaseInputDirective,
    MatProgressBarModule,
  ],
  templateUrl: './coordinates-form.component.html',
})
export class CoordinatesFormComponent {
  constructor(private context: CoordinatesContext, private routeCalculator: RouteCalculatorService) {}

  numberOfCharactersInPoint = numberOfCharactersInPoint

  calculating = false

  latestResult?: CalculationViewItem

  formGroup = new FormGroup<CoordinatesFormGroup>({
    droneStart: new FormControl<string>('', {
      nonNullable: true,
      validators: coordinateInputValidators,
    }),
    objectPickup: new FormControl<string>('', {
      nonNullable: true,
      validators: coordinateInputValidators,
    }),
    deliveryDestination: new FormControl<string>('', {
      nonNullable: true,
      validators: coordinateInputValidators,
    }),
  })

  // TODO: validate that middle is different from both start and end

  async onFormSubmit() {
    if (this.formGroup.valid && !this.calculating) {
      this.calculating = true
      const coordinates = this.formGroup.getRawValue()

      this.context.sendNewCoordinates(coordinates)
      const result = await this.routeCalculator.calculateRoute(coordinates)
      this.calculating = false

      this.latestResult = {
        fullPath: [...result.pathToObject.coords, ...result.pathToDelivery.coords.slice(1)],
        totalTime: (result.pathToDelivery.totalTime + result.pathToObject.totalTime).toFixed(2),
      }
    }
  }
}

// function pointValidator(control: FormControl<string>): ValidationErrors | null {
//   if (control.value?.length == numberOfCharactersInPoint && !BoardPoints.includes(control.value)) {
//     return {
//       invalidPoint: true,
//     }
//   }
//   return null
// }
