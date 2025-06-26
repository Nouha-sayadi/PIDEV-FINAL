package esprit.projectidea.Repositories;

import esprit.projectidea.Entity.Idea;
import esprit.projectidea.Entity.IdeaStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IdeaRepository extends JpaRepository<Idea, Long> {
    List<Idea> findByStatus(IdeaStatus status);
    List<Idea> findByTitleContaining(String keyword);

    @Query("SELECT i FROM Idea i WHERE " +
            "LOWER(i.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(i.status) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(i.author.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Idea> searchByMultipleAttributes(@Param("keyword") String keyword);
}

