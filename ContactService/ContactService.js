import contacts from "../data/contactsData";

export function getAllContacts() {
    return contacts
}

export function getContactById(contact_id) {
    for (const contact of contacts) {
        if (Number(contact.id) === Number(contact_id)) {
            return contact
        }
    }
}