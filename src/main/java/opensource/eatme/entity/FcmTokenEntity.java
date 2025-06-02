package opensource.eatme.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "fcmtokens")
public class FcmTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)  // username 당 토큰 1개만 저장
    private String username;

    @Column(nullable = false)
    private String token;

    public FcmTokenEntity() {}

    public FcmTokenEntity(String username, String token) {
        this.username = username;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
