package opensource.eatme.dto;

public class FcmTokenRequest {
    private String username;
    private String token;

    public FcmTokenRequest() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
