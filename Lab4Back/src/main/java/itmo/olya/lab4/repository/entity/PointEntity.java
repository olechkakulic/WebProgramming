package itmo.olya.lab4.repository.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "points")
public class PointEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Column(nullable = false)
    @Getter
    @Setter
    private Double x;

    @Column(nullable = false)
    @Getter
    @Setter
    private Double y;

    @Column(nullable = false)
    @Getter
    @Setter
    private Double r;

    @Column(nullable = false)
    @Getter
    @Setter
    private Boolean isHit;

    @Column(nullable = false, name = "user_login")
    @Getter
    @Setter
    private String userLogin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_login", nullable = false, insertable = false, updatable = false)
    @Getter
    private UserEntity user;
}

