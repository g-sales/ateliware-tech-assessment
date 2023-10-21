import { Injectable } from '@angular/core'
import { Coordinates } from '@ateliware/shared'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CoordinatesContext {
  private coordinatesSubject = new Subject<Coordinates>()
  coordinates$ = this.coordinatesSubject.asObservable()

  sendNewCoordinates(coordinates: Coordinates) {
    this.coordinatesSubject.next(coordinates)
  }
}
