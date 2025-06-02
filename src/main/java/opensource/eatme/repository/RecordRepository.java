package opensource.eatme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import opensource.eatme.entity.RecordEntity;

import java.time.LocalDate;
import java.util.List;

public interface RecordRepository extends JpaRepository<RecordEntity, Long> {

    //List<RecordEntity> findByExpirationDate(LocalDate expirationDate);

    List<RecordEntity> findByExpirationDateIn(List<LocalDate> targetDates);
}