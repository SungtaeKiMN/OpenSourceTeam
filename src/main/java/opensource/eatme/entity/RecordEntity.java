package opensource.eatme.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "records")
public class RecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalDate date;

    // 기본 생성자
    public RecordEntity() {}

    // 생성자
    public RecordEntity(String name, LocalDate date) {
        this.name = name;
        this.date = date;
    }

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}