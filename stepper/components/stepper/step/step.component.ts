import { AfterContentInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { StepEventInterface } from '~/app/modules/layout/entities/interfaces/step-event.interface';
import { StepperLabelDirective } from '~/app/modules/layout/directives/stepper/stepper-label/stepper-label.directive';
import { StepperNextDirective } from '~/app/modules/layout/directives/stepper/stepper-next/stepper-next.directive';
import { StepperPrevDirective } from '~/app/modules/layout/directives/stepper/stepper-prev/stepper-prev.directive';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  animations: [
    trigger('step', [
      state('enable', style({
        height: '*',
        visibility: 'visible',
        opacity: 1
      })),
      state('disable', style({
        height: 0,
        visibility: 'hidden',
        opacity: 0
      })),
      transition('enable <=> disable', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class StepComponent implements OnInit, AfterContentInit {
  @Input() stepControl: FormGroup;
  @Output() moveToAnotherStep: EventEmitter<StepEventInterface> = new EventEmitter<StepEventInterface>();
  @ContentChild(StepperLabelDirective) private stepLabel!: StepperLabelDirective;
  @ContentChild(StepperNextDirective) private stepNext!: StepperNextDirective;
  @ContentChild(StepperPrevDirective) private stepPrev!: StepperPrevDirective;
  title: TemplateRef<StepperLabelDirective>;
  stepIndex = 1;
  tabStatus: 'enable' | 'disable' = 'disable';
  isCurrent = false;
  isLast = false;
  isEditable = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.stepNext?.clickEvent.subscribe(() => {
      this.moveToAnotherStep.emit({
        index: this.stepIndex + 1,
        isValid: this.stepControl.valid
      });
    });

    this.stepPrev?.clickEvent.subscribe(() => {
      this.moveToAnotherStep.emit({
        index: (this.stepIndex !== 1) ? this.stepIndex - 1 : 1,
        isValid: this.stepControl.valid
      });
    });

    this.title = this.stepLabel?.templateRef;
  }

  onTitleClick(): void {
    this.isEditable = false;

    this.moveToAnotherStep.emit({
      index: this.stepIndex,
      isValid: this.stepControl.valid
    });
  }
}
