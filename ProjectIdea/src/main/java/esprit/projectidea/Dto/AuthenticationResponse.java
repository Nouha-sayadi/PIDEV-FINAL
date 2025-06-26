package esprit.projectidea.Dto;

import esprit.projectidea.Entity.Role;
import esprit.projectidea.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String messageResponse;
    private Role role;
    private String email;
    private User user;

}