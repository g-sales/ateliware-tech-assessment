import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouteResultsContext } from '../../contexts/route-result.context'
import { RouteResultComponent } from '../route-result/route-result.component'

@Component({
  selector: 'last-results',
  standalone: true,
  imports: [CommonModule, RouteResultComponent],
  templateUrl: './last-results.component.html',
})
export class LastResultsComponent {
  lastResults$ = inject(RouteResultsContext).routes$
}
