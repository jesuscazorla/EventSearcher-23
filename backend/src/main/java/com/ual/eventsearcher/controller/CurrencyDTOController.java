package com.ual.eventsearcher.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ual.eventsearcher.dto.CurrencyDTO;
import com.ual.eventsearcher.service.CurrencyDTOService;

@RestController
@RequestMapping("/currency")
public class CurrencyDTOController {
   
    @Autowired
    private CurrencyDTOService currencyService;

    @GetMapping("data")
    public ResponseEntity<CurrencyDTO> getCurrencyData() {
        return new ResponseEntity<CurrencyDTO>(currencyService.retrieveCurrency(),HttpStatus.OK);
    }

    
}
