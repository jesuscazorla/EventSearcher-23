package com.ual.eventsearcher.entity;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long apiEventId;
    private String name;   
    private String image;
    private String type;
    
    @OneToOne(cascade = CascadeType.ALL)
    private Price price;

    private String datetime_utc;
    private String datetime_local;
    private String localtimezone;
    @OneToOne(cascade = CascadeType.ALL)
    private Venue venue;
    private String[] classification;

 
    public Event() {
    }

    public Event(String name, String image, long apiEventId, String type,
     Price price, String datetime_utc, String datetime_local, String localtimezone, 
     Venue venue, String[] classification) {
        this.name = name;
        this.image = image;
        this.apiEventId = apiEventId;
        this.type = type;
        this.price = price;
        this.datetime_utc = datetime_utc;
        this.datetime_local = datetime_local;
        this.localtimezone = localtimezone;
        this.venue = venue;
        this.classification = classification;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getimage() {
        return image;
    }

    public void setimage(String image) {
        this.image = image;
    }


        
    public long getApiEventId() {
        return apiEventId;
    }

    public void setApiEventId(long apiEventId) {
        this.apiEventId = apiEventId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Price getPrice() {
        return price;
    }

    public void setPrice(Price price) {
        this.price = price;
    }


    public String getDatetime_utc() {
        return datetime_utc;
    }

    public void setDatetime_utc(String datetime_utc) {
        this.datetime_utc = datetime_utc;
    }

    public String getDatetime_local() {
        return datetime_local;
    }

    public void setDatetime_local(String datetime_local) {
        this.datetime_local = datetime_local;
    }

    public String getLocaltimezone() {
        return localtimezone;
    }

    public void setLocaltimezone(String localtimezone) {
        this.localtimezone = localtimezone;
    }

    public Venue getVenue() {
        return venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public String[] getClassification() {
        return classification;
    }

    public void setClassification(String[] classification) {
        this.classification = classification;
    }

  

   
}

