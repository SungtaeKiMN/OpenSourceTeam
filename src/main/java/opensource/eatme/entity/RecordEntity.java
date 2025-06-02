package opensource.eatme.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "records")
public class RecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // 유통기한 (nullable)
    private LocalDate expirationDate;

    // 구매날짜 (nullable)
    private LocalDate purchaseDate;

    @Column(nullable = false)
    private String username;

    // 기본 생성자
    public RecordEntity() {}

    // 생성자 (유통기한용)
    public RecordEntity(String name, LocalDate expirationDate, LocalDate purchaseDate, String username) {
        this.name = name;
        this.expirationDate = expirationDate;
        this.purchaseDate = purchaseDate;
        this.username = username;
    }

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


}
