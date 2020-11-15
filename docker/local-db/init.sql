CREATE DATABASE devdb;
\c devdb 

create TABLE app_user (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(255),
    password_hash VARCHAR(255),
    salt VARCHAR(255)
);

CREATE TABLE task (
    id SERIAL NOT NULL PRIMARY KEY,
    owner_id INT NOT NULL,
    status VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),

    CONSTRAINT fk_user_id
        FOREIGN KEY(owner_id)
            REFERENCES app_user(id)
);