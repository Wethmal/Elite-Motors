package com.example.backend.repository;

import com.example.backend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    // මෙතන මුකුත් ලියන්න ඕන නෑ!
    // JpaRepository එකෙන් අපිට save(), findAll(), findById(), deleteById() වගේ ඔක්කොම නිකන්ම හම්බෙනවා.
}