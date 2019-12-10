CREATE TABLE tm_user (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (250) NOT NULL,
    password VARCHAR (250) DEFAULT NULL
);


CREATE TABLE tm_role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (250) NOT NULL
);

CREATE TABLE tm_user_roles (
    user_id INTEGER NOT NULL,
    roles_id INTEGER NOT NULL,
    CONSTRAINT FK_USER FOREIGN  KEY (user_id)
        REFERENCES tm_user(id),
    CONSTRAINT FK_ROLE FOREIGN KEY (roles_id)
        REFERENCES tm_role(id)
);

INSERT INTO tm_role VALUES (1,'standard');
INSERT INTO tm_role VALUES (2,'admin');

INSERT INTO tm_user VALUES (1,'User 1', '$2a$10$9zY/1WDK8ORop1uVFog89um3Vj5YuLPWyZM7upl1hKecPs69EVL2m');

INSERT INTO tm_user_roles VALUES (1,1);
INSERT INTO tm_user_roles VALUES (1,2);

COMMIT ;
