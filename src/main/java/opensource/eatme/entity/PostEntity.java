package opensource.eatme.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "post")
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title; // 글 제목

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content; // 글 내용

    @Column(nullable = false)
    private String username; // 작성자 아이디

    @Column(nullable = true)
    private LocalDate expireDate; // 유통기한

    @Transient
    private String dDay; // D-Day (DB에는 저장하지 않음)


    public PostEntity() {
    }

    public PostEntity(String title, String content, String username, LocalDate expireDate) {
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

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public LocalDate getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(LocalDate expireDate) {
        this.expireDate = expireDate;
    }


}

