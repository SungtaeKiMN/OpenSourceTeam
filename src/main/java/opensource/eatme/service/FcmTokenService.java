package opensource.eatme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import opensource.eatme.entity.FcmTokenEntity;
import opensource.eatme.repository.FcmTokenRepository;

import java.util.Optional;

@Service
public class FcmTokenService {

    @Autowired
    private FcmTokenRepository fcmTokenRepository;

    public void saveOrUpdateToken(String username, String token) {
        Optional<FcmTokenEntity> optional = fcmTokenRepository.findByUsername(username);
        if (optional.isPresent()) {
            FcmTokenEntity existing = optional.get();
            existing.setToken(token);
            fcmTokenRepository.save(existing);
        } else {
            FcmTokenEntity newToken = new FcmTokenEntity(username, token);
            fcmTokenRepository.save(newToken);
        }
    }
}
