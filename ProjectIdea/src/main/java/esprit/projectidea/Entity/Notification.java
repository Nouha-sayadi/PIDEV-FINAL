package esprit.projectidea.Entity;

import jakarta.persistence.*;
import org.apache.catalina.User;

import java.time.LocalDateTime;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime datePayment;
    private float amount;
    private String paymentMethod;
    private String status; // Tu peux créer un enum PaymentStatus si tu veux




}
