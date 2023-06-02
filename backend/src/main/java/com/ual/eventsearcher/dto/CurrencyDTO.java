package com.ual.eventsearcher.dto;

import java.util.HashMap;

public class CurrencyDTO {
    private HashMap<String,Double> currency;
    
    public CurrencyDTO(HashMap<String, Double> currency) {
        this.currency = currency;
    }

    public HashMap<String, Double> getCurrency() {
        return currency;
    }
    
    public void setCurrency(HashMap<String, Double> currency) {
        this.currency = currency;
    }

}
