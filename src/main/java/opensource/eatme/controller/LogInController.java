package opensource.eatme.controller;

import opensource.eatme.entity.LogInEntity;
import opensource.eatme.service.LogInService;
import org.springframework.beans.factory.annotation.Autowired;
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

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody LogInEntity user) {
        boolean success = logInService.login(user.getUsername(), user.getPassword());
        return success ? "로그인 성공" : "로그인 실패";
    }
}
