import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {SelectContactAction, UpdateContactAction} from "../state/contacts/contacts.actions";
import {ApplicationState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  // we need to initialize since we can't use ?. operator with ngModel
  contact: Contact = <Contact>{address: {}};

  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.store.dispatch(new SelectContactAction(this.route.snapshot.paramMap.get('id')));
    this.store.select(state => state.contacts.list.find(c => +c.id === +state.contacts.selectedContactId))
      .pipe(map(contact => <Contact>{...contact})) // use spread operator to create a new object
      .subscribe(contact => this.contact = contact);
  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.store.dispatch(new UpdateContactAction(this.contact));
    this.router.navigate(['/contact', contact.id]);
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }
}

