DROP TABLE users;
CREATE TABLE users (
    number INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL, 
    email TEXT NOT NULL
);

DROP TABLE contacts;
CREATE TABLE contacts (
    id TEXT PRIMARY KEY, 
    owner INTEGER NOT NULL, 
    contact INTEGER NOT NULL, 
    relation VARCHAR(100),
    UNIQUE (owner, contact),
    FOREIGN KEY (owner) REFERENCES users(number),
    FOREIGN KEY (contact) REFERENCES users(number)
);

INSERT INTO users (number, name, surname, email) VALUES
(1, "Pau", "Martinez", "paumartinezrios@gmail.com"), 
(2, "Miguel", "Martinez", "mikipepi@hotmail.com"), 
(3, "Emma", "Martinez", "emmamartinez@gmail.com"),
(4, "Josefa", "Rios", "mikipepi@hotmail.com");

INSERT INTO contacts (id, owner, contact, relation) VALUES
("bd57954e-cb32-4474-8230-2ab63aa9c155", 1, 2, "Padre"),
("0297f86f-a310-40aa-91df-354ae94ac8c9", 2, 4, "Mujer"),
("707c8121-e281-43e2-b6cc-4996b3e1311f", 4, 3, "Hija"),
("c716846c-4ea0-4657-bd6b-ee5eb4a1fd24", 3, 4, "Madre");



