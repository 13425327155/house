package com.example.house.model;

public class House {
    private int id;
    private String house_name;
    private String house_area;
    private String location;
    private String house_type;
    private String rent;
    private String house_state;
    private String tel;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getHouse_name() {
        return house_name;
    }

    public void setHouse_name(String house_name) {
        this.house_name = house_name;
    }

    public String getHouse_area() {
        return house_area;
    }

    public void setHouse_area(String house_area) {
        this.house_area = house_area;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getHouse_type() {
        return house_type;
    }

    public void setHouse_type(String house_type) {
        this.house_type = house_type;
    }

    public String getRent() {
        return rent;
    }

    public void setRent(String rent) {
        this.rent = rent;
    }

    public String getHouse_state() {
        return house_state;
    }

    public void setHouse_state(String house_state) {
        this.house_state = house_state;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    @Override
    public String toString() {
        return "House{" +
                "id=" + id +
                ", house_name='" + house_name + '\'' +
                ", house_area='" + house_area + '\'' +
                ", location='" + location + '\'' +
                ", house_type='" + house_type + '\'' +
                ", rent='" + rent + '\'' +
                ", house_state='" + house_state + '\'' +
                ", tel='" + tel + '\'' +
                '}';
    }
}
