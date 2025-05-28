package opensource.eatme.repository;

import opensource.eatme.entity.LogInEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface LogInRepository extends JpaRepository<LogInEntity, Long> {
    Optional<LogInEntity> findByUsernameAndPassword(String username, String password);
}