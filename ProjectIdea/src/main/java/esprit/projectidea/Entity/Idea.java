package esprit.projectidea.Entity;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;


import java.time.LocalDateTime;
import java.util.Set;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Idea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private IdeaStatus status;
    private LocalDateTime submissionDate;
    private int likes;

    private String videoUrl;
    private String reportFileName;

    @ManyToOne
    @JoinColumn(name = "author_user_id", referencedColumnName = "userId", nullable = false)
    @JsonIgnore
    private User author;

}



