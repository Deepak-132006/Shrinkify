package com.deepak.shrinkify.repository;

import com.deepak.shrinkify.model.ClickLog;
import com.deepak.shrinkify.model.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClickLogRepository extends JpaRepository <ClickLog, Long>{
    @Query("SELECT c FROM ClickLog c WHERE c.url = :url ORDER BY c.clickedAt DESC LIMIT 10")
    List<ClickLog> findRecentByUrl (@Param("url")Url url);
}
