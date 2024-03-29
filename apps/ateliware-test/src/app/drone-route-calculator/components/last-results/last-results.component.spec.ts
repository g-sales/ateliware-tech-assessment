import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LastResultsComponent } from './last-results.component'

describe('LastResultsComponent', () => {
  let component: LastResultsComponent
  let fixture: ComponentFixture<LastResultsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastResultsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(LastResultsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
