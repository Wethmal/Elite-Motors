package com.example.elite_Motors.elite_Motors.repository;

import com.example.elite_Motors.elite_Motors.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    //  CRUD (Save, Update, Delete, Find) have in this
}