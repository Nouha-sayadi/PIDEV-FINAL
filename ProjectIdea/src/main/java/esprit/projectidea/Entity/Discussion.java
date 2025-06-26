package esprit.projectidea.Entity;

import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Discussion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private LocalDateTime date;
    private String authorName;
    @ManyToOne
    @JsonIgnore
    private Idea idea;

    @ManyToOne
    @JsonIgnore
    private User sender;

    @ManyToOne
    @JsonIgnore
    private User receiver;


}
