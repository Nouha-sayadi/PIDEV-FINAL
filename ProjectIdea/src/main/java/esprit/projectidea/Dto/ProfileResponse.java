package esprit.projectidea.Dto;

import esprit.projectidea.Entity.Role;
import esprit.projectidea.Entity.User;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProfileResponse {
    private Long id ;
    private String firstName ;
    private String lastName ;
    private String email;
    private Role role;
    public static ProfileResponse fromEntity(User user)
    {
        if(user == null)
        {
            return null ;
        }

        return ProfileResponse.builder()
                .id(user.getUserId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .build() ;
    }


}