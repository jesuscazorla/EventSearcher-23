package com.ual.eventsearcher.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "price")
public class Price {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    Double lowestPrice = 0.0;
    Double highestPrice = 0.0;
    Double averagePrice = 0.0;
    Integer listingCount = 0;

    public Price() {
    }

    public Price(Double lowestPrice, Double highestPrice, Double averagePrice, Integer listingCount) {
        this.lowestPrice = lowestPrice;
        this.highestPrice = highestPrice;
        this.averagePrice = averagePrice;
        this.listingCount = listingCount;
    }

    public Double getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(Double lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

    public Double getHighestPrice() {
        return highestPrice;
    }

    public void setHighestPrice(Double highestPrice) {
        this.highestPrice = highestPrice;
    }

    public Double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(Double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public Integer getListingCount() {
        return listingCount;
    }

    public void setListingCount(Integer listingCount) {
        this.listingCount = listingCount;
    }


}
