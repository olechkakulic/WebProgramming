package labs.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;


//Аннотация @Entity обозначает, что класс является сущностью.
@Entity
@Table(name = "points", schema = "s336799")
@Data
@NoArgsConstructor
@Getter
@Setter
public class Point {
    private float x;
    private float y;
    private float r;
    private boolean isHit;
//    первичный ключ, который автоматически сгенерируется
    @Id
    @GeneratedValue
    private Long id;
    public Point(float x, float y, float r, boolean isHit){
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
    }
    public boolean getIsHit(){
        return isHit;
    }
}