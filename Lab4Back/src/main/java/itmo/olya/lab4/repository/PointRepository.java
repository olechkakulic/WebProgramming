package itmo.olya.lab4.repository;


import itmo.olya.lab4.repository.entity.PointEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository extends CrudRepository<PointEntity, Long> {
    Iterable<PointEntity> findPointEntitiesByUser_Login(String userLogin);
    void deleteByUserLogin(String userLogin);

}
