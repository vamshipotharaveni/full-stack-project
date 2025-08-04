package com.example.houserental.controller;

import com.example.houserental.dto.UserProfileRequest;
import com.example.houserental.entity.User;
import com.example.houserental.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        User userDetails = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Remove password from response
        userDetails.setPassword(null);
        return ResponseEntity.ok(userDetails);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody UserProfileRequest request, 
                                              Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if email is already taken by another user
        if (!user.getEmail().equals(request.getEmail()) && 
            userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest()
                    .body("Error: Email is already in use!");
        }

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());

        userRepository.save(user);
        
        // Remove password from response
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}