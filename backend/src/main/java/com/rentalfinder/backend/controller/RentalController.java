package com.rentalfinder.backend.controller;

import com.rentalfinder.backend.entity.Rental;
import com.rentalfinder.backend.repository.RentalRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "*")
public class RentalController {
    
    @Autowired
    private RentalRepository rentalRepository;
    
    @GetMapping
    public ResponseEntity<List<Rental>> getAllRentals() {
        List<Rental> rentals = rentalRepository.findAll();
        return ResponseEntity.ok(rentals);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable Long id) {
        Optional<Rental> rental = rentalRepository.findById(id);
        return rental.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Rental> createRental(@Valid @RequestBody Rental rental) {
        Rental savedRental = rentalRepository.save(rental);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRental);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Rental> updateRental(@PathVariable Long id, @Valid @RequestBody Rental rentalDetails) {
        Optional<Rental> optionalRental = rentalRepository.findById(id);
        
        if (optionalRental.isPresent()) {
            Rental rental = optionalRental.get();
            rental.setTitle(rentalDetails.getTitle());
            rental.setDescription(rentalDetails.getDescription());
            rental.setPrice(rentalDetails.getPrice());
            rental.setLocation(rentalDetails.getLocation());
            rental.setBedrooms(rentalDetails.getBedrooms());
            rental.setBathrooms(rentalDetails.getBathrooms());
            rental.setSquareFeet(rentalDetails.getSquareFeet());
            rental.setContactEmail(rentalDetails.getContactEmail());
            rental.setContactPhone(rentalDetails.getContactPhone());
            
            Rental updatedRental = rentalRepository.save(rental);
            return ResponseEntity.ok(updatedRental);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRental(@PathVariable Long id) {
        if (rentalRepository.existsById(id)) {
            rentalRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Rental>> searchRentals(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer bedrooms,
            @RequestParam(required = false) Integer bathrooms) {
        
        List<Rental> rentals = rentalRepository.findRentalsWithFilters(
                location, minPrice, maxPrice, bedrooms, bathrooms);
        return ResponseEntity.ok(rentals);
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Rental Finder Backend is running!");
    }
}