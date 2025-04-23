package labs.util;

public class Validator {

    public boolean isHit(float x, float y, float r) {
        return ((x <= 0) && (x >= -r) && (y <= 0) && (y >= -r/2) || //прямоугольник левый нижний
                (x>=0) && (y >= x - r) && (y <= 0) || //треугольник правый нижний
                (x * x + y * y <= r * r ) && (x >= 0) && (y >= 0) //круг
        );
    }
}