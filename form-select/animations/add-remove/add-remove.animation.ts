import { trigger, animate, style, transition } from "@angular/animations";

export const addRemoveAnimation = trigger('addRemoveElement', [
  transition(':enter', [
    style({ display: 'none' }),
    animate('0s 0.3s', style({ display: 'block' })),
  ]),
  transition(':leave', [
    animate('0s 0.3s', style({ display: 'none' }))
  ])
]);
