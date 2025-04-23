package itmo.olya.lab4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RootController {
    @RequestMapping({"/", "/loginpage", "/mainpage"})
    public String root() {
        return "forward:index.html";
    }
}