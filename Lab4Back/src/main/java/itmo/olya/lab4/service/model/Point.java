package itmo.olya.lab4.service.model;

import lombok.Getter;
import lombok.Setter;

public class Point {
    @Getter
    private final long id;
    @Setter
    @Getter
    private double x;
    @Setter
    @Getter
    private double y;
    @Setter
    @Getter
    private double r;
    @Setter
    @Getter
    private boolean isHit;
    @Setter
    @Getter
    private String userLogin;

    public Point(long id) {
        this.id = id;
    }
}
