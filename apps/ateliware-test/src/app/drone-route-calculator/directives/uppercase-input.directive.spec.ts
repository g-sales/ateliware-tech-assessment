import { UppercaseInputDirective } from './uppercase-input.directive'
import { MockBuilder, MockRender, MockedComponentFixture, ngMocks } from 'ng-mocks'

describe('UppercaseInputDirective', () => {
  let fixture: MockedComponentFixture<HTMLInputElement>
  let input: HTMLInputElement
  let directive: UppercaseInputDirective

  beforeEach(async () => {
    await MockBuilder(UppercaseInputDirective)
    fixture = MockRender(`<input uppercaseInput />`)
    input = fixture.point.nativeElement
    directive = ngMocks.get(fixture.point, UppercaseInputDirective)
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })

  it('should uppercase on input', async () => {
    input.value = 'a1'

    input.dispatchEvent(new InputEvent('input'))

    expect(input.value).toBe('A1')
  })
})
