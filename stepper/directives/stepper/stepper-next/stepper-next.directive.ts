import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appStepperNext]'
})
export class StepperNextDirective {
  @Output() clickEvent: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor() { }

  @HostListener('click', ['$event']) private onClick(event: MouseEvent): void {
    this.clickEvent.emit(event);
  }
}
