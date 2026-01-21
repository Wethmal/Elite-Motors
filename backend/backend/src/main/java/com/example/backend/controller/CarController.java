package com.example.backend.controller;

import com.example.backend.model.Car;
import com.example.backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin("*") // Frontend එකට සම්බන්ධ වෙන්න අවසර දීම
public class CarController {

    @Autowired
    private CarRepository carRepository;

    // 1. අලුත් කාර් එකක් දාන්න (CREATE)
    @PostMapping("/add")
    public Car addCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    // 2. ඔක්කොම කාර් ටික ගන්න (READ ALL)
    @GetMapping("/all")
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // 3. කාර් එකක් ID එකෙන් ගන්න (READ ONE) - Edit කරනකොට ඕන වෙන්න පුළුවන්
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return carRepository.findById(id).orElse(null);
    }

    // 4. කාර් එකක් Update කරන්න (UPDATE)
    @PutMapping("/update/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        Car car = carRepository.findById(id).orElse(null);
        if (car != null) {
            // Frontend එකෙන් එන අලුත් විස්තර ටික පරණ එකට දානවා
            car.setBrand(carDetails.getBrand());
            car.setModel(carDetails.getModel());
            car.setYear(carDetails.getYear());
            car.setPrice(carDetails.getPrice());
            car.setFuel(carDetails.getFuel());
            car.setImage(carDetails.getImage());
            car.setDescription(carDetails.getDescription());
            car.setMileage(carDetails.getMileage());
            car.setTransmission(carDetails.getTransmission());
            car.setStatus(carDetails.getStatus());
            car.setCertified(carDetails.getCertified());
            car.setFeatures(carDetails.getFeatures());

            return carRepository.save(car); // ආපහු Save කරනවා
        }
        return null;
    }

    // 5. කාර් එකක් මකන්න (DELETE)
    @DeleteMapping("/delete/{id}")
    public String deleteCar(@PathVariable Long id) {
        carRepository.deleteById(id);
        return "Car deleted successfully!";
    }
}