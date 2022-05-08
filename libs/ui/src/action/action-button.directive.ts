import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[mat-button][atriusActionButton]' })
export class ActionButtonDirective {
  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.classList.remove('mat-button');
  }
}
