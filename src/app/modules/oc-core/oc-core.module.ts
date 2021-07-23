import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { AngularDraggableModule } from 'angular2-draggable';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BaseDialogComponent } from './components/base-dialog/base-dialog.component';
import { DialogComponentHostDirective } from './directives/dialog-component-host.directive';
import { AuthInterceptor } from './helpers/auth-interceptor';
import { HttpErrorInterceptor } from './helpers/http-error.interceptor';



@NgModule({
  declarations: [ConfirmDialogComponent, BaseDialogComponent, DialogComponentHostDirective],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    TableModule,
    CardModule,
    CalendarModule,
    InputTextModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AutoCompleteModule,
    CheckboxModule,
    AngularDraggableModule,
    RadioButtonModule,
    TooltipModule,
    OverlayPanelModule,
    InputSwitchModule,
    ProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    TableModule,
    CardModule,
    CalendarModule,
    InputTextModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AutoCompleteModule,
    CheckboxModule,
    AngularDraggableModule,
    RadioButtonModule,
    TooltipModule,
    OverlayPanelModule,
    InputSwitchModule,
    ProgressSpinnerModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    BaseDialogComponent
  ],
  providers: [
    NgbActiveModal,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'hr'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]

})
export class OcCoreModule { }
