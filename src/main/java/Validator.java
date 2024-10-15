import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Validator {
    public static boolean isGetInArea(Map<String, Float> params) {
        Float x = params.get("xCoord");
        Float y = params.get("yCoord");
        Float r = params.get("rParam");
//        сначала для треугольника
//        потом для прямоугольника
//        потом для полуокружности
        return ((y <= (0.5 * x + r/2)) && (-r <= x && x <= 0) && (y >= 0)) ||
                ((x >= -r && x <= 0) && (y >= -r/2 && y <= 0)) ||
                ((x * x + y * y <= r / 2 * r / 2) && (x >= 0) && (y <= 0));
    }

    //    проверка на nullPointerException
    public static boolean isValidate(Map<String, Float> params) {
        if (!params.containsKey("xCoord") || !params.containsKey("yCoord") || !params.containsKey("rParam")) {
            throw new IllegalArgumentException("Missing required parameters");
        }
        Float x = params.get("xCoord");
        Float y = params.get("yCoord");
        Float r = params.get("rParam");
        return (isValidateR(r)) && (isValidateX(x)) && (isValidateY(y));
    }

    //    в Set более эффективный поиск по сравнению с массивом
    public static boolean isValidateX(Float x) {
        Set<Float> allowedValues = new HashSet<>(Arrays.asList(-5f, -4f, -3f, -2f, -1f, 0f, 1f, 2f, 3f));
        return allowedValues.contains(x);
    }

    public static boolean isValidateR(Float r) {
        Set<Float> allowedValues = new HashSet<>(Arrays.asList(1f, 2f, 3f, 4f, 5f));
        return allowedValues.contains(r);
    }


    public static boolean isValidateY(Float y) {
        return (y >= -3) && (y <= 3);
    }

}
