import com.fastcgi.FCGIInterface;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

public class Main {
    // Формируем ответы вручную без использования фреймворков
    private static final String HTTP_RESPONSE = """
            Content-Type: application/json
                    
            {"code":"%d","result":"%b","x":"%.1f","y":"%.1f","r":"%.1f","time":"%s","proccestime":"%.3f"}
            """;
    private static final String HTTP_ERROR = """
            Content-Type: application/json
                    
            {"code":"%d","result":"%b","time":"%s","proccestime":"%.3f"}
            """;

    public static void main(String[] args) {
        FCGIInterface fcgiInterface = new FCGIInterface();
        while (fcgiInterface.FCGIaccept() >= 0) {
            String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
            if (method.equals("GET")) {
                long time = System.nanoTime();
                String queryString = FCGIInterface.request.params.getProperty("QUERY_STRING");
                try {
                    if (queryString == null || queryString.isEmpty()) {
                        throw new IllegalArgumentException("QUERY_STRING is empty.");
                    }

                    Map<String, Float> queryMap = parseQueryString(queryString);
                    if (Validator.isValidate(queryMap)) {
                        boolean result = Validator.isGetInArea(queryMap);
                        System.out.printf((HTTP_RESPONSE) + "%n", 200, result, queryMap.get("xCoord"), queryMap.get("yCoord"), queryMap.get("rParam"),
                                String.valueOf(LocalTime.now(ZoneId.of( "Europe/Moscow" ))).split("\\.")[0], (double) (System.nanoTime() - time) / 1000000); //
                    } else {
                        System.out.printf((HTTP_ERROR) + "%n", 400, "Invalid values", String.valueOf(LocalTime.now(ZoneId.of( "Europe/Moscow" ))).split("\\.")[0],
                                (double) (System.nanoTime() - time) / 1000000);
                    }
                } catch (IllegalArgumentException e) {
                    System.out.printf((HTTP_ERROR) + "%n", 400, "Invalid values",  String.valueOf(LocalTime.now(ZoneId.of( "Europe/Moscow" ))).split("\\.")[0],
                            (double) (System.nanoTime() - time) / 1000000);
                } catch (Exception e) {
                    System.out.printf((HTTP_ERROR) + "%n", 400, "Invalid values",  String.valueOf(LocalTime.now()).split("\\.")[0],
                            (double) (System.nanoTime() - time) / 1000000);
                }
            }
        }
    }

    // Парсим строку запроса
    private static Map<String, Float> parseQueryString(String queryString) {
        Map<String, Float> queryMap = new HashMap<>();
        if (queryString != null && !queryString.isEmpty()) {
            String[] pairs = queryString.split("&");
            for (String pair : pairs) {
                String[] keyAndValue = pair.split("=");
                if (keyAndValue.length == 2) {
                    String key = decodeUTF(keyAndValue[0]);
                    try {
                        Float value = Float.parseFloat(decodeUTF(keyAndValue[1]).replace(",", "."));
                        queryMap.put(key, value);
                    } catch (NumberFormatException e) {
                        throw new IllegalArgumentException("Invalid value for parameter: " + keyAndValue[0]);
                    }
                }
            }
        }
        return queryMap;
    }

    // Декодирование URL
    private static String decodeUTF(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }
}
