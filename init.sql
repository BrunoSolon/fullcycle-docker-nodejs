CREATE DATABASE IF NOT EXISTS nodedb;
USE nodedb;

CREATE TABLE if not exists people (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    PRIMARY KEY (id)
);