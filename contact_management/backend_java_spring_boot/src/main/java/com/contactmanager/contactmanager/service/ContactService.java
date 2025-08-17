package com.contactmanager.contactmanager.service;

import com.contactmanager.contactmanager.model.Contact;
import com.contactmanager.contactmanager.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public int addContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public int deleteContact(int id) {
        return contactRepository.deleteById(id);
    }

    public List<Contact> searchContacts(String name) {
        return contactRepository.searchByName(name);
    }

    public Contact searchContactsByid(int id) {
        return contactRepository.findById(id);
    }

    public Contact updateContact(int id, Contact updatedContact) {
        Contact existing = contactRepository.findById(id);
        if (existing != null) {
            updatedContact.setId(id);
            contactRepository.save(updatedContact);
            return updatedContact;
        }
        return null;
    }

    public List<Contact> getSortedContacts(String sortBy, String direction) {
        return contactRepository.findAllSorted(sortBy, direction);
    }

    public List<Contact> searchByPhone(String phone) {
        return contactRepository.searchByPhone(phone);
    }

    public int getTotalContactCount() {
        return contactRepository.countAllContacts();
    }

    public List<Contact> getRecentContacts(int limit) {
        return contactRepository.findRecentContacts(limit);
    }

    public List<Contact> getPaginatedContacts(int page, int size) {
        int offset = page * size;
        return contactRepository.findPaginated(size, offset);
    }

    public List<Contact> searchContactsByTag(String tag) {
        return contactRepository.searchByTag(tag);
    }

    public List<Contact> getRecentlyAdded(int days) {
        return contactRepository.findRecent(days);
    }

    public List<Contact> advancedSearch(String name, String tag, String notes) {
        return contactRepository.advancedSearch(name, tag, notes);
    }
}

