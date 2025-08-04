package com.rentalfinder.repository;

import com.rentalfinder.model.House;
import com.rentalfinder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findByOwner(User owner);
    
    @Query("SELECT h FROM House h WHERE " +
           "(:district IS NULL OR LOWER(h.district) LIKE LOWER(CONCAT('%', :district, '%'))) AND " +
           "(:city IS NULL OR LOWER(h.city) LIKE LOWER(CONCAT('%', :city, '%')))")
    List<House> findByDistrictAndCity(@Param("district") String district, @Param("city") String city);
    
    List<House> findByDistrict(String district);
    List<House> findByCity(String city);
    List<House> findByHouseType(String houseType);
    
    @Query("SELECT h FROM House h WHERE " +
           "(:houseType IS NULL OR h.houseType = :houseType) AND " +
           "(:district IS NULL OR LOWER(h.district) LIKE LOWER(CONCAT('%', :district, '%'))) AND " +
           "(:city IS NULL OR LOWER(h.city) LIKE LOWER(CONCAT('%', :city, '%')))")
    List<House> searchHouses(@Param("houseType") String houseType, 
                            @Param("district") String district, 
                            @Param("city") String city);
}