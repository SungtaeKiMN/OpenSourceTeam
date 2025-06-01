package opensource.eatme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import opensource.eatme.entity.RecordEntity;

public interface RecordRepository extends JpaRepository<RecordEntity, Long> {

}