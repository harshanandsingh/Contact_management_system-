package com.contactmanager.contactmanager.repository;

import com.contactmanager.contactmanager.model.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ContactRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int save(Contact contact) {
//        String sql = "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)";
//        return jdbcTemplate.update(sql, contact.getName(), contact.getEmail(), contact.getPhone());
        if (contact.getId() > 0) {
            // Update existing contact
//            String sql = "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?";
//            return jdbcTemplate.update(sql, contact.getName(), contact.getEmail(), contact.getPhone(), contact.getId());
//            String sql = "UPDATE contacts SET name = ?, email = ?, phone = ?, tags = ? WHERE id = ?";
//            return jdbcTemplate.update(sql, contact.getName(), contact.getEmail(), contact.getPhone(), contact.getTags(), contact.getId());
            String sql = "UPDATE contacts SET name = ?, email = ?, phone = ?, tags = ?, notes = ? WHERE id = ?";
            return jdbcTemplate.update(sql, contact.getName(), contact.getEmail(), contact.getPhone(), contact.getTags(), contact.getNotes(), contact.getId());
        } else {
            // Insert new contact
//            String sql = "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)";
//            return jdbcTemplate.update(sql, contact.getName(), contact.getEmail(), contact.getPhone());
//            String sql = "INSERT INTO contacts (name, email, phone, tags) VALUES (?, ?, ?, ?)";
//            return jdbcTemplate.update(sql, contact.getName(), contact.getEmail(), contact.getPhone(), contact.getTags());
            String sql = "INSERT INTO contacts (name, email, phone, tags, notes) VALUES (?, ?, ?, ?, ?)";
            return jdbcTemplate.update(sql, contact.getName(), contact.getEmail(), contact.getPhone(), contact.getTags(), contact.getNotes());
        }
    }

    public List<Contact> findAll() {
        String sql = "SELECT * FROM contacts";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Contact.class));
    }

    public int deleteById(int id) {
        String sql = "DELETE FROM contacts WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    public List<Contact> searchByName(String name) {
        String sql = "SELECT * FROM contacts WHERE name LIKE ?";
        return jdbcTemplate.query(sql, new Object[]{"%" + name + "%"}, new BeanPropertyRowMapper<>(Contact.class));
    }


    public Contact findById(int id) {
        String sql = "SELECT * FROM contacts WHERE id = ?";
        List<Contact> contacts = jdbcTemplate.query(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Contact.class));
        return contacts.isEmpty() ? null : contacts.get(0);
    }

    public List<Contact> findAllSorted(String sortBy, String direction) {
        String sql = "SELECT * FROM contacts ORDER BY " + sortBy + " " + direction;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Contact.class));
    }

    public List<Contact> searchByPhone(String phone) {
        String sql = "SELECT * FROM contacts WHERE phone LIKE ?";
        return jdbcTemplate.query(sql, new Object[]{"%" + phone + "%"}, new BeanPropertyRowMapper<>(Contact.class));
    }

    public int countAllContacts() {
        String sql = "SELECT COUNT(*) FROM contacts";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public List<Contact> findRecentContacts(int limit) {
        String sql = "SELECT * FROM contacts ORDER BY created_on DESC LIMIT ?";
        return jdbcTemplate.query(sql, new Object[]{limit}, new BeanPropertyRowMapper<>(Contact.class));
    }

    public List<Contact> findPaginated(int limit, int offset) {
        String sql = "SELECT * FROM contacts ORDER BY id LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql, new Object[]{limit, offset}, new BeanPropertyRowMapper<>(Contact.class));
    }

    public List<Contact> searchByTag(String tag) {
        String sql = "SELECT * FROM contacts WHERE tags LIKE ?";
        return jdbcTemplate.query(sql, new Object[]{"%" + tag + "%"}, new BeanPropertyRowMapper<>(Contact.class));
    }

    public List<Contact> findRecent(int days) {
        String sql = "SELECT * FROM contacts WHERE created_on >= NOW() - INTERVAL ? DAY";
        return jdbcTemplate.query(sql, new Object[]{days}, new BeanPropertyRowMapper<>(Contact.class));
    }

    public List<Contact> advancedSearch(String name, String tag, String notes) {
        StringBuilder sql = new StringBuilder("SELECT * FROM contacts WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (name != null && !name.isEmpty()) {
            sql.append(" AND name LIKE ?");
            params.add("%" + name + "%");
        }
        if (tag != null && !tag.isEmpty()) {
            sql.append(" AND tags LIKE ?");
            params.add("%" + tag + "%");
        }
        if (notes != null && !notes.isEmpty()) {
            sql.append(" AND notes LIKE ?");
            params.add("%" + notes + "%");
        }

        return jdbcTemplate.query(sql.toString(), params.toArray(), new BeanPropertyRowMapper<>(Contact.class));
    }

}

