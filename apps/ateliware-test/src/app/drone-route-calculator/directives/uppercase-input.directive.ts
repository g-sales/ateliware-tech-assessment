import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core'
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Directive({
  selector: '[uppercaseInput]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UppercaseInputDirective),
    },
  ],
})
export class UppercaseInputDirective extends DefaultValueAccessor {
  constructor(renderer: Renderer2, elementRef: ElementRef) {
    super(renderer, elementRef, false)
  }

  @HostListener('input', ['$event']) input($event: InputEvent) {
    const target = $event.target as HTMLInputElement
    const start = target.selectionStart

    target.value = target.value.toUpperCase()
    target.setSelectionRange(start, start)

    this.onChange(target.value)
  }
}
