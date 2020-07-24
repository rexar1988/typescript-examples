import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { StepComponent } from '~/app/modules/layout/components/stepper/step/step.component';
import { StepEventInterface } from '~/app/modules/layout/entities/interfaces/step-event.interface';

@Component({
  selector: 'app-vertical-stepper',
  templateUrl: './vertical-stepper.component.html',
  styleUrls: ['./vertical-stepper.component.scss']
})
export class VerticalStepperComponent implements OnInit, AfterContentInit {
  @Input() linear = true;
  @Input() multipleOpens = false;
  @ContentChildren(StepComponent) stepComponents!: QueryList<StepComponent>;
  currentStep = 1;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.initTabs();

    this.stepComponents.forEach((stepComponent: StepComponent, index: number) => {
      stepComponent.stepIndex = index + 1;

      stepComponent.moveToAnotherStep.subscribe((stepEvent: StepEventInterface) => {
        if (stepEvent.index < this.currentStep) {
          this.currentStep = stepEvent.index;
        } else {
          if (this.checkPrevSteps(stepEvent.index)) {
            this.getStepComponent(this.currentStep).isEditable = true;
            this.currentStep = stepEvent.index;

            // todo: add logic for disable button prev/next
          } else {
            this.getStepComponent(this.currentStep).stepControl.markAllAsTouched();
          }
        }

        this.hideAllAndOpenCurrent(this.currentStep);
      });
    });
  }

  getStepComponent(index: number): StepComponent {
    return this.stepComponents.find((component: StepComponent) => component.stepIndex === index);
  }

  checkPrevSteps(index: number): boolean {
    for (let i = index - 1; i >= 1; i--) {
      if (this.getStepComponent(i).stepControl.invalid) {
        return false;
      }
    }

    return true;
  }

  hideAllAndOpenCurrent(currentIndex: number): void {
    this.stepComponents.forEach((stepComponent: StepComponent) => {
      if (stepComponent.stepIndex !== currentIndex) {
        stepComponent.tabStatus = 'disable';
        stepComponent.isCurrent = false;
      } else {
        stepComponent.tabStatus = 'enable';
        stepComponent.isCurrent = true;
      }
    });
  }

  initTabs(): void {
    this.stepComponents.first.tabStatus = 'enable';
    this.stepComponents.first.isCurrent = true;
    this.stepComponents.last.isLast = true;
  }
}
