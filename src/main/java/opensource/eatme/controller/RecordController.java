package opensource.eatme.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import opensource.eatme.entity.RecordEntity;
import opensource.eatme.repository.RecordRepository;

import java.util.List;

@RestController
@RequestMapping("/records")
public class RecordController {

    @Autowired
    private RecordRepository recordRepository;
    /*@Autowired
    private RecordService recordService;*/

    @GetMapping
    public List<RecordEntity> getAllRecords() {
        return recordRepository.findAll(Sort.by(Sort.Direction.ASC, "expirationDate"));
        //return recordRepository.findAll();
    }

    @PostMapping
    public RecordEntity createRecord(@RequestBody RecordEntity record) {
        return recordRepository.save(record);
    }

}
