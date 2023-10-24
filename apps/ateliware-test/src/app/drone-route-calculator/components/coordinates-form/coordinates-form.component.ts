import { Component, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms'
import { Coordinates, RouteResult, generateBoardPoints } from '@ateliware/shared'
import { UppercaseInputDirective } from '../../directives/uppercase-input.directive'
import { RouteResultsContext } from '../../contexts/route-result.context'
import { RouteCalculatorService } from '../../services/route-calculator.service'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { RouteResultComponent } from '../route-result/route-result.component'
import { Subscription, merge } from 'rxjs'

type CoordinatesFormGroup = {
  [key in keyof Coordinates]: FormControl<Coordinates[key]>
}

const numberOfCharactersInPoint = 2

const BoardPoints = generateBoardPoints(8)

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
export class CoordinatesFormComponent implements OnDestroy {
  private sub: Subscription

  constructor(private context: RouteResultsContext, private routeCalculator: RouteCalculatorService) {
    const { droneStart, deliveryDestination, objectPickup } = this.formGroup.controls

    this.sub = merge(droneStart.valueChanges, deliveryDestination.valueChanges).subscribe(() =>
      objectPickup.updateValueAndValidity()
    )
  }

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
      validators: coordinateInputValidators.concat(validateObjectPickup),
    }),
    deliveryDestination: new FormControl<string>('', {
      nonNullable: true,
      validators: coordinateInputValidators,
    }),
  })

  async onFormSubmit() {
    if (this.formGroup.valid && !this.calculating) {
      this.calculating = true
      const coordinates = this.formGroup.getRawValue()

      this.latestResult = await this.routeCalculator.calculateRoute(coordinates)
      this.context.storeResult(this.latestResult)
      this.calculating = false
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}

const pointValidator: ValidatorFn = (control) => {
  if (control.value?.length == numberOfCharactersInPoint && !BoardPoints.includes(control.value)) {
    return {
      invalidPoint: true,
    }
  }
  return null
}

const validateObjectPickup: ValidatorFn = (control) => {
  if (!control.value) return null

  const group = control.parent as unknown as FormGroup<CoordinatesFormGroup>
  const droneStart = group.controls.droneStart.value
  const destination = group.controls.deliveryDestination.value

  if ((droneStart && droneStart === control.value) || (destination && destination === control.value)) {
    return {
      samePoint: true,
    }
  }

  return null
}

const coordinateInputValidators = [
  Validators.required,
  Validators.maxLength(numberOfCharactersInPoint),
  Validators.minLength(numberOfCharactersInPoint),
  pointValidator,
]
