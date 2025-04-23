package itmo.olya.lab4.service.exception;

public class InvalidJwtException extends Exception {
    public InvalidJwtException(String message) {
        super(message);
    }

    public InvalidJwtException(Throwable cause) {
        super(cause);
    }
}
