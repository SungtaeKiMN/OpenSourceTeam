package opensource.eatme.controller;

import opensource.eatme.dto.ChatMessageDto;
import opensource.eatme.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chat")
public class ChatRestController {

    private final ChatService chatService;

    public ChatRestController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/history")
    public List<ChatMessageDto> getChatHistory(@RequestParam String roomId) {
        return chatService.getChatMessages(roomId);
    }
}