package opensource.eatme.scheduler;

import opensource.eatme.entity.FcmTokenEntity;
import opensource.eatme.repository.FcmTokenRepository;
import opensource.eatme.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import opensource.eatme.entity.RecordEntity;
import opensource.eatme.service.FCMService;
import opensource.eatme.service.RecordService;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class ExpirationNotificationScheduler {

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private FcmTokenRepository fcmTokenRepository;

    @Autowired
    private RecordService recordService;

    @Autowired
    private FCMService fcmService;

    // 매일 자정에 실행 (cron: 초 분 시 일 월 요일)
    //@Scheduled(cron = "0 0 0 * * *")
    @Scheduled(fixedRate = 60000)
    public void notifyExpiration() {
        LocalDate today = LocalDate.now();
        List<LocalDate> targetDates = Arrays.asList(
                today,
                today.plusDays(1),
                today.plusDays(2),
                today.plusDays(3)
        );

        List<RecordEntity> expiringRecords = recordRepository.findByExpirationDateIn(targetDates);


        for (RecordEntity record : expiringRecords) {
            String username = record.getUsername();
            Optional<FcmTokenEntity> tokenEntityOpt = fcmTokenRepository.findByUsername(username);

            if (tokenEntityOpt.isPresent()) {
                String token = tokenEntityOpt.get().getToken();

                long daysLeft = record.getExpirationDate().toEpochDay() - today.toEpochDay();
                String title = "유통기한 알림";
                String body = String.format("%s의 유통기한이 %s입니다.", record.getName(), formatDDayMessage(daysLeft));

                fcmService.sendMessage(token, title, body);
            } else {
                System.out.println("토큰이 없는 사용자: " + username);
            }
        }
    }

    private String formatDDayMessage(long daysLeft) {
        if (daysLeft > 0) return "D-" + daysLeft;
        else if (daysLeft == 0) return "D-DAY";
        else return "이미 지난 유통기한입니다.";
    }
}
