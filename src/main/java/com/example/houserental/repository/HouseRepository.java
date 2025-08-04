package com.example.houserental.repository;

import com.example.houserental.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    
    List<House> findByUserId(Long userId);
    
    @Query("SELECT h FROM House h WHERE " +
           "(:district IS NULL OR h.district LIKE %:district%) AND " +
           "(:city IS NULL OR h.city LIKE %:city%)")
    List<House> searchByLocation(@Param("district") String district, 
                                @Param("city") String city);
}