import { Injectable, OnDestroy } from '@angular/core'
import { RouteResult } from '@ateliware/shared'
import { BehaviorSubject, Observable } from 'rxjs'

const storageKey = 'last-routes'
export const storageLimit = 10

@Injectable({
  providedIn: 'root',
})
export class RouteResultsContext implements OnDestroy {
  private lastRoutesSubject: BehaviorSubject<RouteResult[]>
  routes$: Observable<RouteResult[]>

  constructor() {
    this.lastRoutesSubject = new BehaviorSubject(this.getStoredData())
    this.routes$ = this.lastRoutesSubject.asObservable()
  }

  storeResult(result: RouteResult) {
    const currentData = this.getStoredData()
    if (currentData.length === storageLimit) {
      currentData.pop()
    }
    currentData.splice(0, 0, result)
    localStorage.setItem(storageKey, JSON.stringify(currentData))
    this.lastRoutesSubject.next(currentData)
  }

  private getStoredData() {
    const storedData = localStorage.getItem(storageKey)
    const storagedRoutes: RouteResult[] = storedData ? JSON.parse(storedData) : []
    return storagedRoutes
  }

  ngOnDestroy(): void {
    this.lastRoutesSubject.complete()
  }
}
