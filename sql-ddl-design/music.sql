-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name TEXT[] NOT NULL
);

CREATE TABLE producers (
  id SERIAL PRIMARY KEY,
  name TEXT[] NOT NULL
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  artists_id INT NOT NULL REFERENCES artists
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL,
  release_date DATE NOT NULL,
  artists_id INT NOT NULL REFERENCES artists,
  album_id INT NOT NULL REFERENCES albums,
  producers_id INT NOT NULL REFERENCES producers
);

INSERT INTO artists
 (name) VALUES 
  ('{"Hanson"}'),
  ('{"Queen"}'),
  ('{"Mariah Cary", "Boyz II Men"}'),
  ('{"Lady Gaga", "Bradley Cooper"}'),
  ('{"Nickelback"}'),
  ('{"Jay Z", "Alicia Keys"}'),
  ('{"Katy Perry", "Juicy J"}'),
  ('{"Maroon 5", "Christina Aguilera"}'),
  ('{"Avril Lavigne"}'),
  ('{"Destiny''s Child"}');

INSERT INTO albums
  (name, artists_id) VALUES
  ('Middle of Nowhere', 1),
  ('A Night at the Opera', 2),
  ('Daydream', 3),
  ('A Star Is Born', 4),
  ('Silver Side Up', 5),
  ('The Blueprint 3', 6),
  ('Prism', 7),
  ('Hands All Over', 8),
  ('Let Go', 9),
  ('The Writing''s on the Wall', 10);

INSERT INTO producers
 (name) VALUES 
('{"Dust Brothers", "Stephen Lironi"}'),
('{"Roy Thomas Baker"}'),
('{"Walter Afanasieff"}'),
('{"Benjamin Rice"}'),
('{"Rick Parashar"}'),
('{"Al Shux"}'),
('{"Max Martin", "Cirkut"}'),
('{"Shellback", "Benny Blanco"}'),
('{"The Matrix"}'),
('{"Darkchild"}');

INSERT INTO songs
 (title, duration_in_seconds, release_date, artists_id, album_id, producers_id) VALUES
  ('MMMBop', 238, '04-15-1997', 1, 1, 1),
  ('Bohemian Rhapsody', 355, '10-31-1975', 2, 2,2),
  ('One Sweet Day', 282, '11-14-1995', 3, 3, 3),
  ('Shallow', 216, '09-27-2018', 4, 4, 4),
  ('How You Remind Me', 223, '08-21-2001', 5, 5, 5),
  ('New York State of Mind', 276, '10-20-2009', 6, 6, 6),
  ('Dark Horse', 215, '12-17-2013', 7 ,7, 7),
  ('Moves Like Jagger', 201, '06-21-2011', 8, 8, 8),
  ('Complicated', 244, '05-14-2002', 9, 9, 9),
  ('Say My Name', 240, '11-07-1999', 10, 10, 10);

SELECT title AS song, a.name AS artist, al.name AS album, p.name AS producer, duration_in_seconds, release_date  FROM songs s 
  JOIN artists a ON artists_id=a.id 
  JOIN albums al ON album_id=al.id 
  JOIN producers p ON producers_id=p.id;