import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'
import { CoordinatesFormComponent } from '../../components/coordinates-form/coordinates-form.component'
import { LastResultsComponent } from '../../components/last-results/last-results.component'

@Component({
  selector: 'delivery-calc-page',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, CoordinatesFormComponent, LastResultsComponent],
  templateUrl: './delivery-calc-page.component.html',
})
export class DeliveryCalcPageComponent {}
