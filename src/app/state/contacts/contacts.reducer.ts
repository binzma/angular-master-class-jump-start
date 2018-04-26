import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from "./contacts.actions";

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
    case ContactsActionTypes.UPDATE_CONTACT:
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


