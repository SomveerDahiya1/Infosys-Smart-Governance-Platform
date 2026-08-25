package org.backend.entity;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long locationId;

    @Column(
            name = "address_line",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String addressLine;

    @Column(name = "area", length = 100)
    private String area;

    @Column(
            name = "city",
            nullable = false,
            length = 100
    )
    private String city;

    @Column(
            name = "state",
            nullable = false,
            length = 100
    )
    private String state;

    @Column(name = "pincode", length = 10)
    private String pincode;

    @Column(
            name = "latitude",
            precision = 10,
            scale = 7
    )
    private BigDecimal latitude;

    @Column(
            name = "longitude",
            precision = 10,
            scale = 7
    )
    private BigDecimal longitude;

    @Column(
            name = "created_at",
            nullable = false
    )
    private LocalDateTime createdAt;


    public Location() {
    }


    @PrePersist
    public void prePersist() {

        this.createdAt = LocalDateTime.now();
    }


    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(
            String addressLine
    ) {
        this.addressLine = addressLine;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(
            BigDecimal latitude
    ) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(
            BigDecimal longitude
    ) {
        this.longitude = longitude;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt = createdAt;
    }
}

