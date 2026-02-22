package com.deepak.shrinkify.repository;

import com.deepak.shrinkify.model.ClickLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClickLogRepository extends JpaRepository <ClickLog, Long>{

}
