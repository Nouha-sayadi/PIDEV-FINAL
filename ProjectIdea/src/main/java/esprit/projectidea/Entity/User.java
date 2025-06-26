package esprit.projectidea.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    @NonNull
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean enabled;
    private long resetToken;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Idea> ideas = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        System.out.println(role.name());
        authorities.add(() -> role.name());
        return authorities;
    }
    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return email;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return userId != null && userId.equals(user.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private List<Discussion> sentDiscussions;

    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private List<Discussion> receivedDiscussions;





}

