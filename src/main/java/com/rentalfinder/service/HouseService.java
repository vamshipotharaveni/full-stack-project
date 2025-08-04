package com.rentalfinder.service;

import com.rentalfinder.dto.HouseRequest;
import com.rentalfinder.dto.HouseResponse;
import com.rentalfinder.model.House;
import com.rentalfinder.model.User;
import com.rentalfinder.repository.HouseRepository;
import com.rentalfinder.repository.UserRepository;
import com.rentalfinder.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HouseService {

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private UserRepository userRepository;

    public List<HouseResponse> getAllHouses() {
        List<House> houses = houseRepository.findAll();
        return houses.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public List<HouseResponse> searchHouses(String houseType, String district, String city) {
        List<House> houses = houseRepository.searchHouses(houseType, district, city);
        return houses.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public List<HouseResponse> getUserHouses(UserPrincipal userPrincipal) {
        User user = userRepository.findByUsername(userPrincipal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<House> houses = houseRepository.findByOwner(user);
        return houses.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public HouseResponse createHouse(HouseRequest request, MultipartFile imageFile, UserPrincipal userPrincipal) {
        User user = userRepository.findByUsername(userPrincipal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        House house = new House();
        house.setHouseType(request.getHouseType());
        house.setPhoneNumber(request.getPhoneNumber());
        house.setDistrict(request.getDistrict());
        house.setCity(request.getCity());
        house.setDescription(request.getDescription());
        house.setRent(request.getRent());
        house.setOwner(user);

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                house.setImage(imageFile.getBytes());
                house.setImageName(imageFile.getOriginalFilename());
                house.setImageType(imageFile.getContentType());
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image", e);
            }
        }

        House savedHouse = houseRepository.save(house);
        return convertToResponse(savedHouse);
    }

    public Optional<House> getHouseById(Long id) {
        return houseRepository.findById(id);
    }

    public byte[] getHouseImage(Long id) {
        Optional<House> house = houseRepository.findById(id);
        return house.map(House::getImage).orElse(null);
    }

    public void deleteHouse(Long id, UserPrincipal userPrincipal) {
        House house = houseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("House not found"));
        
        if (!house.getOwner().getUsername().equals(userPrincipal.getUsername())) {
            throw new RuntimeException("You can only delete your own houses");
        }
        
        houseRepository.delete(house);
    }

    private HouseResponse convertToResponse(House house) {
        return new HouseResponse(
                house.getId(),
                house.getHouseType(),
                house.getPhoneNumber(),
                house.getDistrict(),
                house.getCity(),
                house.getDescription(),
                house.getRent(),
                house.getImageName(),
                house.getImageType(),
                house.getCreatedAt(),
                house.getOwner().getUsername(),
                house.getOwner().getPhoneNumber()
        );
    }
}