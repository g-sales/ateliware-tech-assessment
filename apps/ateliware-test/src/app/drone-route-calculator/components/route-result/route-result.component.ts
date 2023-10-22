import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { RouteResult } from '@ateliware/shared'

@Component({
  selector: 'route-result',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './route-result.component.html',
})
export class RouteResultComponent {
  @Input() routeResult!: RouteResult
}
