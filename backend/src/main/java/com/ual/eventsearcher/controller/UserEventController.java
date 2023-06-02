package com.ual.eventsearcher.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ual.eventsearcher.entity.Event;
import com.ual.eventsearcher.repository.UserRepository;

@RestController
public class UserEventController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users/{id}/events")
    public ResponseEntity<List<Event>> getUserEvents(@PathVariable("id") Long id){
        List<Event> events = userRepository.findById(id).get().getEvent();
        return ResponseEntity.ok(events);
    }
    
}

