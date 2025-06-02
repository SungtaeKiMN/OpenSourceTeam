package opensource.eatme.service;

import com.google.firebase.messaging.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import opensource.eatme.entity.FcmTokenEntity;
import opensource.eatme.repository.FcmTokenRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FCMService {

    @Autowired
    private FcmTokenRepository fcmTokenRepository;

    public void sendMessage(String username, String title, String body) {
        Optional<FcmTokenEntity> tokenEntity = fcmTokenRepository.findByUsername(username);

        if (tokenEntity.isEmpty()) {
            System.out.println("No FCM token for user: " + username);
            return;
        }

        String token = tokenEntity.get().getToken();

        Message message = Message.builder()
                .setToken(token)
                .setNotification(Notification.builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .build();

        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Sent message to " + username + ": " + response);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
        }
    }
}
