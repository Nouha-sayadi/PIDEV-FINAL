package esprit.projectidea.Repositories;

import esprit.projectidea.Entity.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
    @Query("SELECT d FROM Discussion d WHERE d.idea.id = :ideaId AND (d.sender.userId = :userId OR d.receiver.userId = :userId)")
    List<Discussion> findByIdeaIdAndParticipant(@Param("ideaId") Long ideaId, @Param("userId") Long userId);
    List<Discussion> findByIdea_Id(Long ideaId);
}
