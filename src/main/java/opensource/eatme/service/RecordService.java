package opensource.eatme.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import opensource.eatme.entity.RecordEntity;
import opensource.eatme.repository.RecordRepository;

import java.util.List;

@Service
public class RecordService {

    @Autowired
    private RecordRepository recordRepository;

    public List<RecordEntity> findAll() {
        return recordRepository.findAll();
    }

    public RecordEntity save(RecordEntity record) {
        return recordRepository.save(record);
    }
}