CREATE DATABASE app_tareas;

USE app_tareas;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)  UNIQUE NOT NULL,
    password VARCHAR(255)
);
 
 CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    completada  BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
 );

CREATE TABLE shared_todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

--Insert two into the users table
INSERT INTO users (name, email, password) VALUES ('soledad','mslovero@brown.gob.ar', '1234lovero');
INSERT INTO users (name, email, password) VALUES ('maria','soledadlovero@gmail.com', '1234maria');

-- Insert todos into the todos table
INSERT INTO todos (titulo, user_id)
VALUES
("🏃 Go for a morning run 🌄", 1),
("💻 Work on proyect presentation 💼", 1),
("🛒 Go grocery shopping 🛍️", 1),
("📚 Read 30 pages of book 📖", 1),
("🚲 Ride bike to the park 🏞️", 1),
("🍲 Cook dinner for family 🍴", 1),
("🙌 Practice yoga 🧘", 1),
("🎧 Listen to a podcast 🎤", 1),
("🧹 Clean the house 🧼", 1),
("🛌 Get 8 hours of sleep 💤", 1);

INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
VALUES (1, 1, 2);

SELECT todos.*, shared_todos.shared_with_id 
FROM todos 
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id WHERE todos.user_id = [user_id] OR shared_todos.shared_with_id = [user_id;]

