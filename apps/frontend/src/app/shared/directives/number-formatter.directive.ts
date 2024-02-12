import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[crtvsNumberFormatter]',
  standalone: true,
})
export class NumberFormatterDirective {
  @Input() decimalPlaces: number = 2;

  constructor(private el: ElementRef) {
  }

  @HostListener('blur')
  onBlur() {
    const value = this.el.nativeElement.value;
    if (value !== '') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        this.el.nativeElement.value = parsedValue.toFixed(this.decimalPlaces);
      }
    }
  }
}
