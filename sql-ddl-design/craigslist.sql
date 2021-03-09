-- Schema: https://dbdiagram.io/d/604598e4fcdcb6230b23030c

DROP DATABASE IF EXISTS craigslist_db;
CREATE DATABASE craigslist_db;
\c craigslist_db;

CREATE TABLE regions (
  id SERIAL PRIMARY KEY,
  country TEXT DEFAULT 'United States',
  state TEXT NOT NULL,
  city TEXT NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  region INT REFERENCES regions
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users,
  title TEXT NOT NULL,
  description TEXT,
  price FLOAT NOT NULL,
  category_id INT NOT NULL REFERENCES categories,
  region_id INT NOT NULL REFERENCES regions,
  location TEXT NOT NULL
);

INSERT INTO regions (state, city) VALUES 
('Texas', 'Houston'),
('New York', 'New York City');
INSERT INTO regions (country, state, city) VALUES 
('China', 'Hubei', 'Wu Han');

INSERT INTO users (full_name , region) VALUES ('Steve Jobs', 3), ('Rejjie Snow', 3), ('John Lennon', 2), ('Bill Gates', 1);

INSERT INTO categories (name) VALUES ('Kitchen'), ('Music'), ('Travel'), ('Electronics'), ('Books');

INSERT INTO posts (user_id, title, description, category_id , price , location, region_id) VALUES 
(1, 'The Beatles discs', 'full Beatles discography on vinyl', 2, 928.12 ,'32 Dog Street', 3),
(3, 'Mac Book', '1999 macbook', 4, 10234.99 ,'23 Dog Street', 2),
(2, 'Bible', 'First bible ever made', 5, 93.87 ,'Green Tree St.', 3);

SELECT title, description, price, CONCAT(location, ', ',city, ', ', state, ', ', country) AS location , full_name AS seller, name AS category FROM posts p 
JOIN users u ON p.user_id=u.id 
JOIN regions r ON p.region_id=r.id 
JOIN categories c ON p.category_id=c.id;