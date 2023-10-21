import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { Coordinates } from '@ateliware/shared'
import { UppercaseInputDirective } from '../../directives/uppercase-input.directive'
import { CoordinatesContext } from '../../contexts/coordinates.context'

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
  ],
  templateUrl: './coordinates-form.component.html',
})
export class CoordinatesFormComponent {
  constructor(private context: CoordinatesContext) {}

  numberOfCharactersInPoint = numberOfCharactersInPoint

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

  onFormSubmit() {
    if (this.formGroup.valid) {
      this.context.sendNewCoordinates(this.formGroup.getRawValue())
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
