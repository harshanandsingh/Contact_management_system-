package com.contactmanager.contactmanager.model;


import java.time.LocalDateTime;

public class Contact {
    private int id;
    private String name;
    private String email;
    private String phone;
    private LocalDateTime createdOn;
    private String tags;
    private String notes;




    public Contact() {}

    public Contact(int id, String name, String email, String phone, LocalDateTime createdOn, String tags, String notes) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.createdOn = createdOn;
        this.tags = tags;
        this.notes = notes;
    }



    // Getters & Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name.trim(); } // String operation

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email.trim(); }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone.trim(); }

    public LocalDateTime getCreatedOn() { return createdOn; }
    public void setCreatedOn(LocalDateTime createdOn) { this.createdOn = createdOn; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags != null ? tags.trim() : null; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes != null ? notes.trim() : null; }

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}

