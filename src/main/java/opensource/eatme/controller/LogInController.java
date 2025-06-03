package opensource.eatme.controller;

import opensource.eatme.entity.LogInEntity;
import opensource.eatme.service.LogInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LogInController {

    @Autowired
    private LogInService logInService;

    // 회원가입
    @PostMapping("/register")
    public String register(@RequestBody LogInEntity user) {
        logInService.register(user);
        return "회원가입 완료";
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LogInEntity user) {
        boolean success = logInService.login(user.getUsername(), user.getPassword());
        if (success) {
            return ResponseEntity.ok().build(); // 200 OK, body는 없음
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }
    }

}
