package com.rentalfinder.backend.repository;

import com.rentalfinder.backend.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    
    List<Rental> findByLocationContainingIgnoreCase(String location);
    
    List<Rental> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    List<Rental> findByBedroomsAndBathrooms(Integer bedrooms, Integer bathrooms);
    
    @Query("SELECT r FROM Rental r WHERE " +
           "(:location IS NULL OR LOWER(r.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
           "(:minPrice IS NULL OR r.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR r.price <= :maxPrice) AND " +
           "(:bedrooms IS NULL OR r.bedrooms = :bedrooms) AND " +
           "(:bathrooms IS NULL OR r.bathrooms = :bathrooms)")
    List<Rental> findRentalsWithFilters(
            @Param("location") String location,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("bedrooms") Integer bedrooms,
            @Param("bathrooms") Integer bathrooms
    );
}