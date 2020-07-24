import { Directive, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appStepperLabel]'
})
export class StepperLabelDirective implements OnInit {

  constructor(public templateRef: TemplateRef<StepperLabelDirective>) { }

  ngOnInit() {
  }
}
