package esprit.projectidea.RestController;

import esprit.projectidea.Dto.AuthenticationRequest;
import esprit.projectidea.Dto.AuthenticationResponse;
import esprit.projectidea.Dto.ProfileResponse;
import esprit.projectidea.Dto.RegisterRequest;
import esprit.projectidea.Entity.User;
import esprit.projectidea.Exception.UserException;
import esprit.projectidea.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            userService.registerAccount(request);
            response.put("message", "Account created successfully");
            return ResponseEntity.ok(response);
        } catch (UserException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }


    @PostMapping("/auth")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            AuthenticationResponse response = userService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (UserException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable String email) {
        return ResponseEntity.ok(userService.getProfile(email));
    }

    @PutMapping("/profile")
    public ResponseEntity<ProfileResponse> updateProfile(@RequestBody User userProfile) {
        return ResponseEntity.ok(userService.updateProfile(userProfile));
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers(){
        try {
            List<User> users = userService.getAllUsers();

            return ResponseEntity.status(HttpStatus.CREATED).body(users);
        }catch (Exception e) {
            String errorMessage = "An error occurred while fetching users.";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
        }
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

}

