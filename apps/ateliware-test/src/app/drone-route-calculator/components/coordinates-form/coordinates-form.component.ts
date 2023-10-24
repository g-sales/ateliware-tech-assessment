import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { Coordinates, RouteResult } from '@ateliware/shared'
import { UppercaseInputDirective } from '../../directives/uppercase-input.directive'
import { RouteResultsContext } from '../../contexts/route-result.context'
import { RouteCalculatorService } from '../../services/route-calculator.service'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { RouteResultComponent } from '../route-result/route-result.component'

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
    RouteResultComponent,
  ],
  templateUrl: './coordinates-form.component.html',
})
export class CoordinatesFormComponent {
  constructor(private context: RouteResultsContext, private routeCalculator: RouteCalculatorService) {}

  numberOfCharactersInPoint = numberOfCharactersInPoint

  calculating = false

  latestResult?: RouteResult

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

      this.latestResult = await this.routeCalculator.calculateRoute(coordinates)
      this.context.storeResult(this.latestResult)
      this.calculating = false
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
