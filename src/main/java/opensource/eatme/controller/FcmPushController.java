package opensource.eatme.controller;

import opensource.eatme.dto.FcmPushRequest;
import opensource.eatme.service.FCMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class FcmPushController {

    @Autowired
    private FCMService fcmService;

    @PostMapping
    public String sendPush(@RequestBody FcmPushRequest request) {
        fcmService.sendMessage(request.getUsername(), request.getTitle(), request.getBody());
        return "푸시 알림을 전송했습니다.";
    }
}
