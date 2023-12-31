-- Active: 1701567995016@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

DROP TABLE users;

INSERT INTO
    users (id, name, email, password, role)
VALUES (
        'u001',
        'Renan',
        'renan@gmail',
        'renan123',
        'admin'
    );

SELECT * FROM users;

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
        Foreign Key (creator_id) REFERENCES users(id)
    );

DROP TABLE posts;

INSERT INTO
    posts (
        id,
        creator_id,
        content,
        likes,
        dislikes
    )
VALUES ('p001', 'u001', 'alo', 5, 2);

SELECT * FROM posts;

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        Foreign Key (user_id) REFERENCES users(id),
        Foreign Key (post_id) REFERENCES posts(id)
    );

DROP TABLE likes_dislikes;

SELECT * FROM likes_dislikes;

DROP TABLE likes_dislikes;