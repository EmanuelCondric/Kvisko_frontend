import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dialog-component-host]'
})
export class DialogComponentHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}