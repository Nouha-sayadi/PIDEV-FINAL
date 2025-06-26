package esprit.projectidea.RestController;
import esprit.projectidea.Entity.Discussion;
import esprit.projectidea.Entity.Idea;
import esprit.projectidea.Entity.IdeaStatus;
import esprit.projectidea.Repositories.DiscussionRepository;
import esprit.projectidea.Repositories.IdeaRepository;
import esprit.projectidea.Services.IdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin("http://localhost:4200")
public class IdeaController {

    private final IdeaService ideaService;
    @Autowired
    private  DiscussionRepository discussionRepository;

    public IdeaController(IdeaService ideaService) {
        this.ideaService = ideaService;
    }

    @GetMapping
    public List<Idea> getAllIdeas() {
        return ideaService.getAllIdeas();
    }

    @GetMapping("/{id}")
    public Idea getIdeaById(@PathVariable Long id) {
        return ideaService.getIdeaById(id);
    }

    @PostMapping
    public Idea createIdea(@RequestBody Idea idea) {
        return ideaService.saveIdea(idea);
    }

    @PutMapping("/{id}")
    public Idea updateIdea(@PathVariable Long id, @RequestBody Idea updatedIdea) {
        updatedIdea.setId(id);
        return ideaService.saveIdea(updatedIdea);
    }

    @DeleteMapping("/{id}")
    public void deleteIdea(@PathVariable Long id) {
        ideaService.deleteIdea(id);
    }

    @GetMapping("/status/{status}")
    public List<Idea> getIdeasByStatus(@PathVariable IdeaStatus status) {
        return ideaService.searchByStatus(status);
    }

    @GetMapping("/search")
    public List<Idea> searchIdeas(@RequestParam String keyword) {
        return ideaService.searchByMultipleAttributes(keyword);
    }

    @PostMapping("/{id}/like")
    public Idea likeIdea(@PathVariable Long id) {
        return ideaService.likeIdea(id);
    }

    @GetMapping("/{ideaId}/discussions")
    public List<Discussion> getDiscussionsByIdea(@PathVariable Long ideaId) {
        return discussionRepository.findByIdea_Id(ideaId);
    }

    @PostMapping("/{id}/discussions")
    public Discussion addDiscussion(@PathVariable Long id, @RequestBody Discussion discussion) {
        return ideaService.addDiscussion(id, discussion);
    }

    @PostMapping("/{id}/uploadReport")
    public String uploadReport(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        return ideaService.saveReportFile(id, file);
    }

    @GetMapping("/{id}/downloadReport")
    public ResponseEntity<Resource> downloadReport(@PathVariable Long id) {
        Idea idea = ideaService.getIdeaById(id);
        if (idea == null || idea.getReportFileName() == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = Paths.get("uploads/", idea.getReportFileName());
        try {
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<Idea> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusMap) {
        String statusStr = statusMap.get("status");
        if (statusStr == null) {
            return ResponseEntity.badRequest().body(null);
        }
        IdeaStatus newStatus;
        try {
            newStatus = IdeaStatus.valueOf(statusStr);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        Idea updatedIdea = ideaService.updateStatus(id, newStatus);
        if (updatedIdea == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedIdea);
    }




}
