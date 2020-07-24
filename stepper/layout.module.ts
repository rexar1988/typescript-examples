import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalStepperComponent } from './components/stepper/vertical-stepper/vertical-stepper.component';
import { StepComponent } from './components/stepper/step/step.component';

import { StepperLabelDirective } from './directives/stepper/stepper-label/stepper-label.directive';
import { StepperNextDirective } from './directives/stepper/stepper-next/stepper-next.directive';
import { StepperPrevDirective } from './directives/stepper/stepper-prev/stepper-prev.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    VerticalStepperComponent,
    StepComponent,
    StepperLabelDirective,
    StepperNextDirective,
    StepperPrevDirective
  ],
  exports: [
    VerticalStepperComponent,
    StepComponent,
    StepperLabelDirective,
    StepperNextDirective,
    StepperPrevDirective
  ]
})
export class LayoutModule { }
