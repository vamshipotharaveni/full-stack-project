package com.example.houserental.controller;

import com.example.houserental.entity.House;
import com.example.houserental.entity.User;
import com.example.houserental.repository.HouseRepository;
import com.example.houserental.service.FileStorageService;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/houses")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HouseController {

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/add")
    public ResponseEntity<?> addHouse(
            @RequestParam("type") @NotBlank String type,
            @RequestParam("phone") @NotBlank String phone,
            @RequestParam("district") @NotBlank String district,
            @RequestParam("city") @NotBlank String city,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        House house = new House();
        house.setType(type);
        house.setPhone(phone);
        house.setDistrict(district);
        house.setCity(city);
        house.setUser(user);

        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.storeFile(image);
            house.setImageUrl(imageUrl);
        }

        House savedHouse = houseRepository.save(house);
        return ResponseEntity.ok(savedHouse);
    }

    @GetMapping("/search")
    public ResponseEntity<List<House>> searchHouses(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String city) {

        List<House> houses = houseRepository.searchByLocation(district, city);
        return ResponseEntity.ok(houses);
    }

    @GetMapping("/my")
    public ResponseEntity<List<House>> getMyHouses(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<House> houses = houseRepository.findByUserId(user.getId());
        return ResponseEntity.ok(houses);
    }
}