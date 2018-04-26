import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect} from '@ngrx/effects';

import {ContactsService} from '../../contacts.service';
import {Contact} from '../../models/contact';

import {
  ContactsActionTypes,
  LoadContactsSuccessAction,
  UpdateContactSuccessAction
} from '../contacts/contacts.actions';
import {map, switchMap, tap} from "rxjs/operators";


@Injectable()
export class ContactsEffectsService {

  constructor(private actions$: Actions,
    private contactsService: ContactsService,
    private router: Router) {

  }

  @Effect() getContacts$ = this.actions$
    .ofType(ContactsActionTypes.LOAD_CONTACTS).pipe(
      switchMap(() => this.contactsService.getContacts()),
      map((contacts: Array<Contact>) => new LoadContactsSuccessAction(contacts))
    );

  @Effect() updateContact$ = this.actions$
    .ofType(ContactsActionTypes.UPDATE_CONTACT).pipe(
      map(action => action.payload),
      switchMap((contact: Contact) => this.contactsService.updateContact(contact)),
      tap((contact: Contact) => this.router.navigate(['/contact', contact.id])),
      map((contact: Contact) => new UpdateContactSuccessAction(contact))
    );
}
