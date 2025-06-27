package esprit.projectidea.Services;

import esprit.projectidea.Config.PasswordEncoder;
import esprit.projectidea.Dto.AuthenticationRequest;
import esprit.projectidea.Dto.AuthenticationResponse;
import esprit.projectidea.Dto.ProfileResponse;
import esprit.projectidea.Dto.RegisterRequest;
import esprit.projectidea.Entity.Role;
import esprit.projectidea.Entity.User;
import esprit.projectidea.Exception.UserException;
import esprit.projectidea.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    public void registerAccount(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UserException("A user already exists with the same email");
        }

        //Role assignedRole = "ADMIN".equalsIgnoreCase(request.getUserType()) ? Role.ADMIN : Role.USER;
        Role assignedRole =  Role.USER ;

        User.UserBuilder userBuilder = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.bCryptPasswordEncoder().encode(request.getPassword()))
                .role(assignedRole)
                .enabled(true);
        userRepository.save(userBuilder.build());
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            var user = userRepository.getUserByEmail(request.getEmail());

            Map<String, String> claims = new HashMap<>();
            claims.put("role", user.getRole().name());
            claims.put("email", user.getEmail());
            claims.put("id", String.valueOf(user.getUserId()));

            var jwtToken = jwtService.genToken(user, claims);

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .role(user.getRole())
                    .email(user.getEmail())
                    .messageResponse("You have been successfully authenticated!")
                    .user(user)
                    .build();

        } catch (AuthenticationException e) {
            throw new UserException("Invalid credentials.");
        }
    }

    public ProfileResponse getProfile(String email) {
        User user = userRepository.getUserByEmail(email);
        return ProfileResponse.fromEntity(user);
    }

    public ProfileResponse updateProfile(User updatedUser) {
        User user = userRepository.save(updatedUser);
        return ProfileResponse.fromEntity(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
