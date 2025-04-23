package models;

public class Point {
    private final float x;
    private final float y;
    private final float r;
    private final boolean isGetInArea;

    public Point(float x, float y, float r, boolean isGetInArea) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isGetInArea = isGetInArea;
    }

    public float getR() {
        return r;
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public boolean isGetInArea() {
        return isGetInArea;
    }
}
