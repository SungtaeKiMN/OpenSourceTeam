package opensource.eatme.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import opensource.eatme.entity.FcmTokenEntity;

import java.util.Optional;

public interface FcmTokenRepository extends JpaRepository<FcmTokenEntity, Long> {
    Optional<FcmTokenEntity> findByUsername(String username);
}
