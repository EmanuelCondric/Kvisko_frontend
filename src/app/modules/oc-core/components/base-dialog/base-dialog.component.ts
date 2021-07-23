import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogChildItem } from '../../models/dialog-child-item.model';
import { DialogChild } from '../../dialog-child.interface';
import { Subscription } from 'rxjs';
import { DialogComponentHostDirective } from '../../directives/dialog-component-host.directive';

@Component({
  selector: 'app-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.css']
})
export class BaseDialogComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  
  constructor(public activeModal: NgbActiveModal, private componentFactoryResolver: ComponentFactoryResolver) { }

  @ViewChild(DialogComponentHostDirective, {static: true}) dialogComponentHost!: DialogComponentHostDirective;

  @Input() childItem!: DialogChildItem;

  ngOnInit() {
    this.loadComponent();
  }

  ngOnDestroy() {    
    this.subscription.unsubscribe();
  }

  loadComponent() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childItem.component);

    const viewContainerRef = this.dialogComponentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<DialogChild>componentRef.instance).input = this.childItem.id;
    this.subscription.add((<DialogChild>componentRef.instance).output.subscribe( (output: any) => {
      this.activeModal.close(output);
    })
    );
  }

  close() {
    this.activeModal.close(null);
  }

}
