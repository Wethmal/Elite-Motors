package com.example.backend.controller;

import com.example.backend.model.Booking;
import com.example.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;


    @PostMapping("/add")
    public Booking addBooking(@RequestBody Booking booking) {

        booking.setStatus("Pending"); // මුලින්ම Status එක Pending කියලා දානවා
        return bookingRepository.save(booking);
    }


    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }


    @PutMapping("/status/{id}")
    public Booking updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking != null) {
            booking.setStatus(status); // අලුත් Status එක (Approved/Rejected) දානවා
            return bookingRepository.save(booking);
        }
        return null;
    }


    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
        return "Booking Deleted!";
    }
}