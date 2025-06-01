package opensource.eatme.controller;

import opensource.eatme.dto.RecordDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import opensource.eatme.entity.RecordEntity;
import opensource.eatme.repository.RecordRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/records")
public class RecordController {

    @Autowired
    private RecordRepository recordRepository;


    @GetMapping
    public List<RecordDto> getAllRecords() {
        List<RecordEntity> records = recordRepository.findAll(Sort.by(Sort.Direction.ASC, "expirationDate"));

        return records.stream()
                .map(RecordDto::new)
                .collect(Collectors.toList());
    }

    @PostMapping
    public RecordEntity createRecord(@RequestBody RecordEntity record) {
        return recordRepository.save(record);
    }

}
