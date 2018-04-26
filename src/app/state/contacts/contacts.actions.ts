import {Action} from '@ngrx/store';
import {Contact} from '../../models/contact';

export enum ContactsActionTypes {
  LOAD_CONTACTS = '[Contacts] Load',
  LOAD_CONTACTS_SUCCESS = '[Contacts] Load success',
  SELECT_CONTACT = '[Contacts] Select contact',
  UPDATE_CONTACT = '[Contacts] Update contact',
  UPDATE_CONTACT_SUCCESS = '[Contacts] Update contact success',
  ADD_CONTACT = '[Contacts] Add contact'
}

export class LoadContactsAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS;

}

export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;

  constructor(public payload: Array<Contact>) {
  }
}

export class SelectContactAction implements Action {
  readonly type = ContactsActionTypes.SELECT_CONTACT;

  constructor(public payload: string) {
  }
}

export class UpdateContactAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT;

  constructor(public payload: Contact) {
  }
}

export class UpdateContactSuccessAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT_SUCCESS;

  constructor(public payload: Contact) {
  }
}

export class AddContactAction implements Action {
  readonly type = ContactsActionTypes.ADD_CONTACT;

  constructor(public payload: Contact) {
  }
}


/** Implement LoadContactsSuccessAction here */

export type ContactsActions = LoadContactsAction | LoadContactsSuccessAction | SelectContactAction |
  UpdateContactAction | UpdateContactSuccessAction | AddContactAction;
