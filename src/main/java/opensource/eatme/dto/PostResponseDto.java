package opensource.eatme.dto;

import java.time.LocalDate;

public class PostResponseDto {

    private Long id;
    private String title;
    private String content;
    private String username;
    private LocalDate expireDate;  // 유통기한

    public PostResponseDto(Long id, String title, String content, String username, LocalDate expireDate) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.username = username;
        this.expireDate = expireDate;

    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getUsername() {
        return username;
    }

    public LocalDate getExpireDate() {
        return expireDate;
    }
}
