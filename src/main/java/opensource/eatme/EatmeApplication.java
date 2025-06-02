package opensource.eatme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class EatmeApplication {

    public static void main(String[] args) {

        SpringApplication.run(EatmeApplication.class, args);
    }

}
