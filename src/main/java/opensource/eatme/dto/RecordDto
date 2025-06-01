package opensource.eatme.dto;

import opensource.eatme.entity.RecordEntity;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class RecordDto {
    private String name;
    private LocalDate expirationDate;
    private String dDay;

    public RecordDto(RecordEntity entity) {
        this.name = entity.getName();
        this.expirationDate = entity.getExpirationDate();
        this.dDay = calculateDDay(entity.getExpirationDate());
    }

    private String calculateDDay(LocalDate expirationDate) {
        if (expirationDate == null) {
            return "-";
        }

        long daysLeft = ChronoUnit.DAYS.between(LocalDate.now(), expirationDate);

        if (daysLeft > 0) return "D-" + daysLeft;
        else if (daysLeft == 0) return "D-DAY";
        else return "D+" + Math.abs(daysLeft); // 이미 지난 식자재
    }

    // Getter만 있어도 됨
    public String getName() {
        return name;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public String getDDay() {
        return dDay;
    }
}
