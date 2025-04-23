package itmo.olya.lab4.service.exception;


public class UserNotFoundException extends RuntimeException {
    private final String login;

    public UserNotFoundException(String login) {
        this.login = login;
    }

    public String getLogin() {
        return login;
    }
}


