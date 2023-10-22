import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BoardGraph } from '@ateliware/shared'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RoutingTimingsGateway {
  constructor(private httpClient: HttpClient) {}

  getBoardGraph$(): Observable<BoardGraph> {
    return this.httpClient.get<BoardGraph>('https://mocki.io/v1/10404696-fd43-4481-a7ed-f9369073252f')
  }
}
