package opensource.eatme.service;

import opensource.eatme.dto.ChatMessageDto;
import opensource.eatme.entity.ChatMessageEntity;
import opensource.eatme.repository.ChatMessageRepository;
import opensource.eatme.repository.FcmTokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final FcmTokenRepository fcmTokenRepository;
    private final FcmPushService fcmPushService;


    public ChatService(ChatMessageRepository chatMessageRepository,
                       FcmTokenRepository fcmTokenRepository,
                       FcmPushService fcmPushService) {
        this.chatMessageRepository = chatMessageRepository;
        this.fcmTokenRepository = fcmTokenRepository;
        this.fcmPushService = fcmPushService;
    }

    public void saveMessage(ChatMessageDto dto) {
        ChatMessageEntity message = new ChatMessageEntity(
                dto.getRoomId(),
                dto.getSenderId(),
                dto.getReceiverId(),
                dto.getContent(),
                LocalDateTime.now()
        );
        chatMessageRepository.save(message);

        // 상대방 FCM 토큰 조회
        fcmTokenRepository.findByUsername(dto.getReceiverId()).ifPresent(tokenEntity -> {
            fcmPushService.sendPushMessage(tokenEntity.getToken(),
                    "새 메시지 도착",
                    dto.getContent());
        });
    }

    public List<ChatMessageDto> getChatMessages(String roomId) {
        List<ChatMessageEntity> entities = chatMessageRepository.findByRoomIdOrderBySentAt(roomId);

        return entities.stream()
                .map(entity -> {
                    ChatMessageDto dto = new ChatMessageDto();
                    dto.setRoomId(entity.getRoomId());
                    dto.setSenderId(entity.getSenderId());
                    dto.setReceiverId(entity.getReceiverId());
                    dto.setContent(entity.getContent());
                    return dto;
                })
                .collect(Collectors.toList());
    }

}