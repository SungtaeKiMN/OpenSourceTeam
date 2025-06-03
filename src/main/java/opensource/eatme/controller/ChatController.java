package opensource.eatme.controller;

import opensource.eatme.dto.ChatMessageDto;
import opensource.eatme.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat/send")
    @SendTo("/topic/messages")
    public ChatMessageDto sendMessage(ChatMessageDto messageDto) {
        chatService.saveMessage(messageDto);
        return messageDto;
    }
}
