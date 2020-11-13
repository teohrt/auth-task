CREATE DATABASE devdb;
\c devdb 

CREATE TABLE task (
    id SERIAL NOT NULL PRIMARY KEY,
    status VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255)
);