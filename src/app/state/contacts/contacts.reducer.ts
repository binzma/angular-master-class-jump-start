import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from "./contacts.actions";
import {ApplicationState} from "../app.state";
import {createSelector} from "@ngrx/store";

export interface ContactsState {
  list: Array<Contact>;
  selectedContactId: string | null;
  loaded: boolean;
}

const INITIAL_STATE: ContactsState = {
  list: [],
  selectedContactId: null,
  loaded: false
}

export namespace ContactsQuery {
  export const getContacts = (state: ApplicationState) => state.contacts.list;
  export const getLoaded = (state: ApplicationState) => state.contacts.loaded;
  export const getSelectedContactId = (state: ApplicationState) => state.contacts.selectedContactId;
  export const getSelectedContact = createSelector(getContacts, getSelectedContactId, (contacts, id) => {
    const contact = contacts.find(c => +c.id === +id);
    return contact ? Object.assign({}, contact) : undefined;
  });
}

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {

  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loaded: true
      };
    case ContactsActionTypes.SELECT_CONTACT:
      return {
        ...state,
        selectedContactId: action.payload
      };
    case ContactsActionTypes.UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        list: state.list.map(contact => +contact.id === +action.payload.id ? {...contact, ...action.payload} : contact)
      };
    case ContactsActionTypes.ADD_CONTACT:
      if (state.list.find(contact => +contact.id === +action.payload.id)) {
        return state;
      }
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    default:
      return state;
  }

}


