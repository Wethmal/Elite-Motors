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

    // 1. අලුත් බුකින් එකක් දාන්න (CREATE)
    @PostMapping("/add")
    public Booking addBooking(@RequestBody Booking booking) {
        // සටහන: මෙතන LocalDate.now() දැම්මොත් Customer තෝරපු දිනය වෙනුවට 'අද' දිනය වැටෙයි.
        // Customer තෝරපු දවස එහෙමම තියන්න ඕන නම් පහත පේළිය මකන්න.
        // booking.setDate(LocalDate.now());

        booking.setStatus("Pending"); // මුලින්ම Status එක Pending කියලා දානවා
        return bookingRepository.save(booking);
    }

    // 2. බුකින් ඔක්කොම බලන්න (READ ALL)
    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // 3. (අලුත් කොටස) බුකින් එකක Status එක වෙනස් කරන්න (Approve/Reject)
    @PutMapping("/status/{id}")
    public Booking updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking != null) {
            booking.setStatus(status); // අලුත් Status එක (Approved/Rejected) දානවා
            return bookingRepository.save(booking);
        }
        return null;
    }

    // 4. බුකින් එකක් Delete කරන්න
    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
        return "Booking Deleted!";
    }
}