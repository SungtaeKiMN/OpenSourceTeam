package opensource.eatme.service;

import opensource.eatme.entity.LogInEntity;
import opensource.eatme.repository.LogInRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LogInService {

    @Autowired
    private LogInRepository logInRepository;

    public LogInEntity register(LogInEntity user) {
        return logInRepository.save(user);
    }

    public boolean login(String username, String password) {
        Optional<LogInEntity> user = logInRepository.findByUsernameAndPassword(username, password);
        return user.isPresent();
    }
}
