package com.rentalfinder.dto;

import java.time.LocalDateTime;

public class HouseResponse {
    private Long id;
    private String houseType;
    private String phoneNumber;
    private String district;
    private String city;
    private String description;
    private Double rent;
    private String imageName;
    private String imageType;
    private LocalDateTime createdAt;
    private String ownerUsername;
    private String ownerPhone;

    public HouseResponse() {}

    public HouseResponse(Long id, String houseType, String phoneNumber, String district, String city, 
                        String description, Double rent, String imageName, String imageType, 
                        LocalDateTime createdAt, String ownerUsername, String ownerPhone) {
        this.id = id;
        this.houseType = houseType;
        this.phoneNumber = phoneNumber;
        this.district = district;
        this.city = city;
        this.description = description;
        this.rent = rent;
        this.imageName = imageName;
        this.imageType = imageType;
        this.createdAt = createdAt;
        this.ownerUsername = ownerUsername;
        this.ownerPhone = ownerPhone;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHouseType() {
        return houseType;
    }

    public void setHouseType(String houseType) {
        this.houseType = houseType;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRent() {
        return rent;
    }

    public void setRent(Double rent) {
        this.rent = rent;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public String getOwnerPhone() {
        return ownerPhone;
    }

    public void setOwnerPhone(String ownerPhone) {
        this.ownerPhone = ownerPhone;
    }
}