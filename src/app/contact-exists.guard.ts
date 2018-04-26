import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {ApplicationState} from "./state/app.state";
import {Store} from "@ngrx/store";
import {ContactsService} from "./contacts.service";
import {AddContactAction, SelectContactAction} from "./state/contacts/contacts.actions";
import {of} from "rxjs/observable/of";
import {map, switchMap, take, tap} from "rxjs/operators";
import {ContactsQuery} from "./state/contacts/contacts.reducer";

@Injectable()
export class ContactExistsGuard implements CanActivate {


  constructor(private contactsService: ContactsService,
              private store: Store<ApplicationState>) {
  }


  canActivate(route: ActivatedRouteSnapshot) {

    const contactId = route.paramMap.get('id');

    this.store.dispatch(new SelectContactAction(contactId));

    return this.store.select(ContactsQuery.getLoaded).pipe(
      take(1),
      switchMap(loaded => {
        if (loaded) {
          return of(true);
        }
        return this.contactsService.getContact(contactId).pipe(
          tap(contact => this.store.dispatch(new AddContactAction(contact))),
          map(contact => !!contact)
        );
      })
    );
  }
}
