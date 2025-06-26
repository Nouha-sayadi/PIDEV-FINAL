package esprit.projectidea.Repositories;

import esprit.projectidea.Entity.Role;
import esprit.projectidea.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    User getUserByEmail(String email);
    Optional<User> findByUserId(Long userId);
    List<User> findUserByRole(Role role);
}
