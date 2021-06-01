package com.example.house.model;

import java.io.Serializable;

public class Root implements Serializable {
    private int id;
    private String root_number;
    private String root_password;
    private String root_name;
    private String root_mail;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoot_number() {
        return root_number;
    }

    public void setRoot_number(String root_number) {
        this.root_number = root_number;
    }

    public String getRoot_password() {
        return root_password;
    }

    public void setRoot_password(String root_password) {
        this.root_password = root_password;
    }

    public String getRoot_name() {
        return root_name;
    }

    public void setRoot_name(String root_name) {
        this.root_name = root_name;
    }

    public String getRoot_mail() {
        return root_mail;
    }

    public void setRoot_mail(String root_mail) {
        this.root_mail = root_mail;
    }

    @Override
    public String toString() {
        return "Root{" +
                "id=" + id +
                ", root_number='" + root_number + '\'' +
                ", root_password='" + root_password + '\'' +
                ", root_name='" + root_name + '\'' +
                ", root_mail='" + root_mail + '\'' +
                '}';
    }
}
