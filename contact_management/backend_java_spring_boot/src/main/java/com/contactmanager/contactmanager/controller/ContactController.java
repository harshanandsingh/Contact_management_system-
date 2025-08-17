package com.contactmanager.contactmanager.controller;

import com.contactmanager.contactmanager.model.Contact;
import com.contactmanager.contactmanager.service.ContactService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/contacts")
public class ContactController {

    private String escapeCsv(String value) {
        if (value == null) return "";
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            value = value.replace("\"", "\"\"");
            return "\"" + value + "\"";
        }
        return value;
    }

    @Autowired
    private ContactService contactService;

    // add contacts done
    @PostMapping
    public Map<String, String> addContact(@RequestBody Contact contact) {
        contactService.addContact(contact);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Contact added successfully!");
        return response;
    }

    // get all the contacts done
    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getAllContacts();
    }

    //delete contact done
    @DeleteMapping("/{id}")
    public String deleteContact(@PathVariable int id) {
        contactService.deleteContact(id);
        return "Contact deleted successfully!";
    }

    // get by neme  done
    @GetMapping("/search")
    public List<Contact> searchContacts(@RequestParam String name) {
        return contactService.searchContacts(name);
    }

    //update contact by id done
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable int id, @RequestBody Contact updatedContact) {
        Contact contact = contactService.updateContact(id, updatedContact);
        if (contact != null) {
            return ResponseEntity.ok(contact);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //get contact by id done
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable int id) {
        Contact contact = contactService.searchContactsByid(id);
        if (contact != null) {
            return ResponseEntity.ok(contact);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Search by phone done
    @GetMapping("/search/phone")
    public List<Contact> searchByPhone(@RequestParam String phone) {
        return contactService.searchByPhone(phone);
    }

    // ✅ Sort by field (name/id) and direction (asc/desc) done
    @GetMapping("/sort")
    public List<Contact> sortContacts(
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        return contactService.getSortedContacts(sortBy, direction);
    }

    // ✅ Get total number of contacts done
    @GetMapping("/stats/total")
    public int getTotalContacts() {
        return contactService.getTotalContactCount();
    }

    // ✅ Get recently added contacts (limit = 5 by default) done
//    @GetMapping("/recent")
//    public List<Contact> getRecentContacts(@RequestParam(defaultValue = "5") int limit) {
//        return contactService.getRecentContacts(limit);
//    }

    //pagingation with total count
    @GetMapping("/page")
    public Map<String, Object> getPaginatedWithCount(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        List<Contact> contacts = contactService.getPaginatedContacts(page, size);
        int total = contactService.getTotalContactCount();  // You already have this
        Map<String, Object> response = new HashMap<>();
        response.put("contacts", contacts);
        response.put("total", total);
        return response;
    }

    // for search based on tag
    @GetMapping("/search/tag")
    public List<Contact> searchByTag(@RequestParam String tag) {
        return contactService.searchContactsByTag(tag);
    }

    @GetMapping("/export")
    public void exportToCsv(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        String headerValue = "attachment; filename=contacts.csv";
        response.setHeader("Content-Disposition", headerValue);

        List<Contact> contacts = contactService.getAllContacts();

        // CSV header
        PrintWriter writer = response.getWriter();
        writer.println("ID,Name,Email,Phone,Tags,Notes");

        for (Contact contact : contacts) {
            writer.printf("%d,%s,%s,%s,%s,%s%n",
                    contact.getId(),
                    escapeCsv(contact.getName()),
                    escapeCsv(contact.getEmail()),
                    escapeCsv(contact.getPhone()),
                    escapeCsv(contact.getTags()),
                    escapeCsv(contact.getNotes())
            );
        }

        writer.flush();
        writer.close();
    }

    @GetMapping("/recent")
    public List<Contact> getRecentContacts(@RequestParam(defaultValue = "7") int days) {
        return contactService.getRecentlyAdded(days);
    }

    @GetMapping("/search/advanced")
    public List<Contact> advancedSearch(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String tag,
            @RequestParam(required = false) String notes
    ) {
        return contactService.advancedSearch(name, tag, notes);
    }

}

