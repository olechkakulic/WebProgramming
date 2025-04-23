package org.example.servlets;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import models.Point;
import utils.Validator;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
// AreaCheckServlet, осуществляющий проверку попадания точки в область
// на координатной плоскости и формирующий HTML-страницу с результатами проверки.
// Должен обрабатывать все запросы, содержащие сведения о координатах точки и радиусе области.
@WebServlet("/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    private static final String RESULT_PAGE_PATH = "./result.jsp";
    private static final String INDEX_PAGE_PATH = "./index.jsp";
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Map<String, Float> pointMap = parseParametrs(req);
        boolean isValidate = Validator.isValidate(pointMap);
        if (isValidate) {
            boolean isInArea = Validator.isGetInArea(pointMap);
            Point point = new Point(pointMap.get("x"),pointMap.get("y"),pointMap.get("z"), isInArea);
            req.setAttribute("point",point);
            ServletUtils.forwardReqResp(RESULT_PAGE_PATH,req,resp);
        } else {
            ServletUtils.forwardReqResp(INDEX_PAGE_PATH, req, resp);
        }

    }
    //парсим параметры, добавляем их в мапу
    private Map<String, Float> parseParametrs(HttpServletRequest req){
        try{float x = Float.parseFloat(req.getParameter("x").replace(",", "."));
        float y = Float.parseFloat(req.getParameter("y").replace(",", "."));
        float r = Float.parseFloat(req.getParameter("r").replace(",", "."));
        Map<String, Float> pointMap = new HashMap<>();
        pointMap.put("xCoord",x);
        pointMap.put("yCoord",y);
        pointMap.put("rParam",r);
        return pointMap;}
        catch (NumberFormatException exception){
            return null;
        }
    }
}
