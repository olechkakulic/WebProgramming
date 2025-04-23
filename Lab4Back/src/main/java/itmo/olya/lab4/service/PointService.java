package itmo.olya.lab4.service;


import itmo.olya.lab4.repository.PointRepository;
import itmo.olya.lab4.repository.UserRepository;
import itmo.olya.lab4.repository.entity.PointEntity;
import itmo.olya.lab4.repository.entity.UserEntity;
import itmo.olya.lab4.service.exception.PointNotFoundException;
import itmo.olya.lab4.service.exception.UserNotFoundException;
import itmo.olya.lab4.service.model.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PointService {

    private final PointRepository pointRepository;

    @Autowired
    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    public Point getPoint(long id) {
        PointEntity entity = getPointEntity(id);
        Point point = new Point(entity.getId());
        unwrapFromEntity(point, entity);
        return point;
    }

    public Point registerPoint(double x, double y, double r, String userLogin) {
        PointEntity entity = new PointEntity();
        entity.setX(x);
        entity.setY(y);
        entity.setR(r);
        entity.setIsHit(isHit(x, y, r));
        entity.setUserLogin(userLogin);
        PointEntity savedEntity = pointRepository.save(entity);

        Point point = new Point(savedEntity.getId());
        unwrapFromEntity(point, savedEntity);
        return point;
    }


    private PointEntity getPointEntity(long id) throws PointNotFoundException {
        Optional<PointEntity> optionalEntity = pointRepository.findById(id);
        return optionalEntity.orElseThrow(() -> new PointNotFoundException(id));
    }

    private void unwrapFromEntity(Point point, PointEntity entity) {
        point.setX(entity.getX());
        point.setY(entity.getY());
        point.setR(entity.getR());
        point.setHit(entity.getIsHit());
        point.setUserLogin(entity.getUserLogin());
    }

    private void wrapToEntity(Point point, PointEntity entity) {
        entity.setX(point.getX());
        entity.setY(point.getY());
        entity.setR(point.getR());
        entity.setIsHit(point.isHit());
        entity.setUserLogin(point.getUserLogin());
    }

    private boolean isHit(double x, double y, double r) {
        return ((x <= 0) && (x >= -r) && (y <= 0) && (y >= -r / 2)) || // прямоугольник левый нижний
                (x >= 0 && y >= x - r && y <= 0) || // треугольник правый нижний
                (x * x + y * y <= r * r && x >= 0 && y >= 0); // круг
    }

    public List<Point> getPointsByUserLogin(String userLogin){
        List<Point> pointList = new ArrayList<>();
        for (PointEntity pointEntity:pointRepository.findPointEntitiesByUser_Login(userLogin)){
            Point point = new Point(pointEntity.getId());
            unwrapFromEntity(point, pointEntity);
            pointList.add(point);
        }
        return pointList;
    }
    @Transactional
    public void deletePointsByUserLogin(String userLogin) {
        pointRepository.deleteByUserLogin(userLogin);
    }
}

