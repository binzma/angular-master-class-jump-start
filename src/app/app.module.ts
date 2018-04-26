import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ContactsMaterialModule } from './contacts-material.module';

import { ContactsAppComponent } from './app.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';

import { ContactsService } from './contacts.service';

import { APP_ROUTES } from './app.routes';
import { API_ENDPOINT } from './app.tokens';
import {ROOT_REDUCER} from "./state/app.state";
import {StoreModule} from "@ngrx/store";
import {ContactExistsGuard} from "./contact-exists.guard";

import { EffectsModule } from '@ngrx/effects';
import { ContactsEffectsService } from './state/effects/contacts-effects.service';

@NgModule({
  declarations: [
    ContactsAppComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactsEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ContactsMaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(ROOT_REDUCER),
    EffectsModule.forRoot([ContactsEffectsService]),
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ContactsService,
    ContactExistsGuard,
    { provide: API_ENDPOINT, useValue: 'http://localhost:4201/api' }
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {

}
