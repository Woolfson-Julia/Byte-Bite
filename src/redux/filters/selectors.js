import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from '../contacts/selectors';


export const selectContactDataFilter = (state) => state.filters.contactData;

export const selectFilteredContacts = createSelector([selectContacts, selectContactDataFilter], (contacts, contactsFilter) => {
  return contacts.filter((contact) => contact.name.toLowerCase().includes(contactsFilter.toLowerCase().trim()) || contact.number.toLowerCase().includes(contactsFilter.toLowerCase().trim()))
});

