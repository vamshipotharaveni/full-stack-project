package com.rentalfinder.controller;

import com.rentalfinder.dto.HouseRequest;
import com.rentalfinder.dto.HouseResponse;
import com.rentalfinder.model.House;
import com.rentalfinder.security.UserPrincipal;
import com.rentalfinder.service.HouseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/houses")
public class HouseController {

    @Autowired
    private HouseService houseService;

    @GetMapping("/all")
    public ResponseEntity<List<HouseResponse>> getAllHouses() {
        List<HouseResponse> houses = houseService.getAllHouses();
        return ResponseEntity.ok(houses);
    }

    @GetMapping("/search")
    public ResponseEntity<List<HouseResponse>> searchHouses(
            @RequestParam(required = false) String houseType,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String city) {
        List<HouseResponse> houses = houseService.searchHouses(houseType, district, city);
        return ResponseEntity.ok(houses);
    }

    @GetMapping("/my-houses")
    public ResponseEntity<List<HouseResponse>> getUserHouses() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        List<HouseResponse> houses = houseService.getUserHouses(userPrincipal);
        return ResponseEntity.ok(houses);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createHouse(
            @RequestParam("houseType") String houseType,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("district") String district,
            @RequestParam("city") String city,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "rent", required = false) Double rent,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            HouseRequest request = new HouseRequest();
            request.setHouseType(houseType);
            request.setPhoneNumber(phoneNumber);
            request.setDistrict(district);
            request.setCity(city);
            request.setDescription(description);
            request.setRent(rent);

            HouseResponse house = houseService.createHouse(request, image, userPrincipal);
            return ResponseEntity.ok(house);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error creating house: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<HouseResponse> getHouse(@PathVariable Long id) {
        Optional<House> house = houseService.getHouseById(id);
        if (house.isPresent()) {
            // Convert to response manually here
            House h = house.get();
            HouseResponse response = new HouseResponse(
                h.getId(), h.getHouseType(), h.getPhoneNumber(), 
                h.getDistrict(), h.getCity(), h.getDescription(), 
                h.getRent(), h.getImageName(), h.getImageType(), 
                h.getCreatedAt(), h.getOwner().getUsername(), 
                h.getOwner().getPhoneNumber()
            );
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getHouseImage(@PathVariable Long id) {
        byte[] image = houseService.getHouseImage(id);
        if (image != null) {
            Optional<House> house = houseService.getHouseById(id);
            if (house.isPresent()) {
                HttpHeaders headers = new HttpHeaders();
                if (house.get().getImageType() != null) {
                    headers.setContentType(MediaType.parseMediaType(house.get().getImageType()));
                } else {
                    headers.setContentType(MediaType.IMAGE_JPEG);
                }
                return new ResponseEntity<>(image, headers, HttpStatus.OK);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHouse(@PathVariable Long id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            
            houseService.deleteHouse(id, userPrincipal);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "House deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error deleting house: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}