package opensource.eatme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import opensource.eatme.dto.FcmTokenRequest;
import opensource.eatme.service.FcmTokenService;

@RestController
@RequestMapping("/fcm-token")
public class FcmTokenController {

    @Autowired
    private FcmTokenService fcmTokenService;

    @PostMapping
    public String saveToken(@RequestBody FcmTokenRequest request) {
        fcmTokenService.saveOrUpdateToken(request.getUsername(), request.getToken());
        return "FCM token saved/updated successfully";
    }
}
