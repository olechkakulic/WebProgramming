package itmo.olya.lab4.controller;

import itmo.olya.lab4.controller.model.HttpEmpty;
import itmo.olya.lab4.controller.model.HttpPoint;
import itmo.olya.lab4.repository.entity.PointEntity;
import itmo.olya.lab4.service.PointService;
import itmo.olya.lab4.service.UserService;
import itmo.olya.lab4.service.model.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/points")
@RestController
@Validated
public class PointController {

    private final PointService pointService;

    @Autowired
    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    // Добавление новой точки
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public HttpPoint addPoint(@RequestParam double x,
                              @RequestParam double y,
                              @RequestParam double r,
                              @AuthenticationPrincipal UserDetails user) {
        return makeResponsePoint(pointService.registerPoint(x, y, r, user.getUsername()));
    }

    // Получение точек для пользователя
    @GetMapping()
    public List<HttpPoint> getPoints(@AuthenticationPrincipal UserDetails user) {
        return pointService.getPointsByUserLogin(user.getUsername()).stream().map(PointController::makeResponsePoint).toList();
    }

    @DeleteMapping()
    public HttpEmpty deletePoints(@AuthenticationPrincipal UserDetails user) {
        pointService.deletePointsByUserLogin(user.getUsername());
        return new HttpEmpty();
    }

    private static HttpPoint makeResponsePoint(Point point) {
        return new HttpPoint(point.getX(), point.getY(), point.getR(), point.isHit());
    }




//    // Удаление точки по ID
//    @DeleteMapping("/{id}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deletePoint(@PathVariable long id) {
//        pointService.deletePoint(id);
//    }
}

