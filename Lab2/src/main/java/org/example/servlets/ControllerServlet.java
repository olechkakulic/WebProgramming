package org.example.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
@WebServlet("/ControllerServlet")
public class ControllerServlet extends HttpServlet {
    private static final String AREA_CHECK_SERVLET_PATH = "./AreaCheckServlet";
    private static final String INDEX_PAGE_PATH = "./index.jsp";
    private boolean hasRequiredParameters(HttpServletRequest req) {
        return req.getParameter("x") != null && req.getParameter("y") != null && req.getParameter("r") != null;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (hasRequiredParameters(req)) {
            ServletUtils.forwardReqResp(AREA_CHECK_SERVLET_PATH, req, resp);
        } else {
            ServletUtils.forwardReqResp(INDEX_PAGE_PATH, req, resp);
        }
    }
}
