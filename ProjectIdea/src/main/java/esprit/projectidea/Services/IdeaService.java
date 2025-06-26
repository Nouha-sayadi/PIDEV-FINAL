package esprit.projectidea.Services;

import esprit.projectidea.Entity.Discussion;
import esprit.projectidea.Entity.Idea;
import esprit.projectidea.Entity.IdeaStatus;
import esprit.projectidea.Entity.User;
import esprit.projectidea.Repositories.DiscussionRepository;
import esprit.projectidea.Repositories.IdeaRepository;
import esprit.projectidea.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IdeaService {

    private final IdeaRepository ideaRepository;
    private final DiscussionRepository discussionRepository;
    private final UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public IdeaService(IdeaRepository ideaRepository,
                       DiscussionRepository discussionRepository,
                       UserRepository userRepository) {
        this.ideaRepository = ideaRepository;
        this.discussionRepository = discussionRepository;
        this.userRepository = userRepository;
    }

    // Get currently authenticated user
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // assuming email is used as username
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Idea> getAllIdeas() {
        return ideaRepository.findAll();
    }

    public Idea getIdeaById(Long id) {
        return ideaRepository.findById(id).orElse(null);
    }

    public Idea saveIdea(Idea idea) {
        User currentUser = getCurrentUser();
        idea.setAuthor(currentUser);
        idea.setSubmissionDate(LocalDateTime.now());
        return ideaRepository.save(idea);
    }

    public void deleteIdea(Long id) {
        Idea idea = ideaRepository.findById(id).orElseThrow();
        User currentUser = getCurrentUser();
        if (!idea.getAuthor().getUserId().equals(currentUser.getUserId())) {
            throw new RuntimeException("Unauthorized to delete this idea.");
        }
        ideaRepository.deleteById(id);
    }

    public List<Idea> searchByStatus(IdeaStatus status) {
        return ideaRepository.findByStatus(status);
    }

    public List<Idea> searchByMultipleAttributes(String keyword) {
        return ideaRepository.searchByMultipleAttributes(keyword);
    }

    public Idea likeIdea(Long id) {
        Idea idea = ideaRepository.findById(id).orElseThrow();
        idea.setLikes(idea.getLikes() + 1);
        return ideaRepository.save(idea);
    }

    public List<Discussion> getDiscussions(Long ideaId) {
        User currentUser = getCurrentUser();
        return discussionRepository.findByIdeaIdAndParticipant(ideaId, currentUser.getUserId());
    }


    public Discussion addDiscussion(Long ideaId, Discussion discussion) {
        Idea idea = ideaRepository.findById(ideaId).orElseThrow();
        User currentUser = getCurrentUser();

        User receiver = idea.getAuthor();

        discussion.setIdea(idea);
        discussion.setSender(currentUser);
        discussion.setReceiver(receiver);
        discussion.setDate(LocalDateTime.now());

        return discussionRepository.save(discussion);
    }


    public String saveReportFile(Long ideaId, MultipartFile file) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new RuntimeException("Idea not found"));

        try {
            String uploadDir = "uploads/";
            String fileName = ideaId + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            idea.setReportFileName(fileName);
            ideaRepository.save(idea);

            return "Fichier rapport enregistré avec succès.";
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'enregistrement du fichier", e);
        }
    }

    public Idea updateStatus(Long id, IdeaStatus newStatus) {
        Optional<Idea> optionalIdea = ideaRepository.findById(id);
        if (!optionalIdea.isPresent()) return null;

        Idea idea = optionalIdea.get();


        idea.setStatus(newStatus);
        return ideaRepository.save(idea);
    }
}
