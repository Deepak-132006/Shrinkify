package com.deepak.shrinkify;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@Component
public class PostgresConnectionTest {

    @Autowired
    private DataSource dataSource;

    @PostConstruct
    public void testConnection() {
        try (Connection conn = dataSource.getConnection()) {
            System.out.println("Connected to DB: " + conn.getMetaData().getURL());
            System.out.println("DB Username: " + conn.getMetaData().getUserName());
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
