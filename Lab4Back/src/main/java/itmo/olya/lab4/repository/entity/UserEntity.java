package itmo.olya.lab4.repository.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @Column(unique = true, nullable = false)
    @Getter
    @Setter
    private String login;

    @Column(nullable = false)
    @Getter
    @Setter
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Getter
    @Setter
    private List<PointEntity> points;
}
