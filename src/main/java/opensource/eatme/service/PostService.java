package opensource.eatme.service;

import opensource.eatme.dto.PostRequestDto;
import opensource.eatme.dto.PostResponseDto;
import opensource.eatme.entity.PostEntity;
import opensource.eatme.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public PostEntity createPost(PostRequestDto requestDto) {
        PostEntity post = new PostEntity(
                requestDto.getTitle(),
                requestDto.getContent(),
                requestDto.getUsername(),
                requestDto.getExpireDate()  // expireDate 추가
        );

        return postRepository.save(post);
    }

    public List<PostResponseDto> getAllPosts() {
        return postRepository.findAllByOrderByIdDesc().stream()
                .map(post -> new PostResponseDto(
                        post.getId(),
                        post.getTitle(),
                        post.getContent(),
                        post.getUsername(),
                        post.getExpireDate()

                ))
                .collect(Collectors.toList());
    }



    public PostResponseDto createPostAndReturnDto(PostRequestDto requestDto) {
        PostEntity saved = createPost(requestDto);  // 기존 로직 재사용
        return new PostResponseDto(
                saved.getId(),
                saved.getTitle(),
                saved.getContent(),
                saved.getUsername(),
                saved.getExpireDate()

        );
    }

}
