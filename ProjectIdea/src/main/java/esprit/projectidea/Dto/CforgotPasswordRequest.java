package esprit.projectidea.Dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CforgotPasswordRequest {

    private String email;
    private String resetToken ;
    private String newPassword;
}