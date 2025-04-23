package itmo.olya.lab4.service.exception;

public class PointNotFoundException  extends RuntimeException{
    private long pointId;
    public PointNotFoundException(long catId) {
        this.pointId = catId;
    }

    public long getPointId() {
        return pointId;
    }
}

