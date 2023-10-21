import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'
import { CoordinatesFormComponent } from '../../components/coordinates-form/coordinates-form.component'

@Component({
  selector: 'delivery-calc-page',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, CoordinatesFormComponent],
  templateUrl: './delivery-calc-page.component.html',
})
export class DeliveryCalcPageComponent {}
