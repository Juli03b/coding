-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space;

CREATE TABLE galaxies(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE stars (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE planets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbital_period_in_years FLOAT NOT NULL,
  orbits_around INT NOT NULL REFERENCES stars,
  galaxy_id INT NOT NULL REFERENCES galaxies
);

CREATE TABLE moons (
  id SERIAL PRIMARY KEY,
  orbits_around INT REFERENCES planets,
  moons TEXT[] NOT NULL
);


CREATE TABLE planets_moons_stars (
  id SERIAL PRIMARY KEY,
  planet_id INT NOT NULL REFERENCES planets,
  moons_id INT REFERENCES moons,
  star_id INT NOT NULL REFERENCES stars,
  galaxy_id INT NOT NULL REFERENCES galaxies
);

INSERT INTO galaxies (name) VALUES ('Milky Way');

INSERT INTO stars (name) VALUES ('The Sun'), ('Proxima Centauri'), ('Gliese 876');

INSERT INTO planets (name, orbital_period_in_years, orbits_around, galaxy_id) VALUES
  ('Earth', 1.00, 1, 1),
  ('Mars', 1.88, 1, 1),
  ('Venus', 0.62, 1, 1),
  ('Neptune', 164.8,1, 1),
  ('Proxima Centauri b', 0.03, 2, 1),
  ('Gliese 876 b', 0.23, 3, 1);

INSERT INTO moons (orbits_around, moons) VALUES 
  (1, '{"The Moon"}'),
  (2, '{"Phobos", "Deimos"}'),
  (4, '{"Naiad", "Thalassa", "Despina", "Galatea", "Larissa", "S/2004 N 1", "Proteus", "Triton", "Nereid", "Halimede", "Sao", "Laomedeia", "Psamathe", "Neso"}');

INSERT INTO planets_moons_stars(planet_id, moons_id, star_id, galaxy_id) VALUES 
  (1, 1, 1, 1),
  (2, 2, 1, 1),
  (4,3, 1, 1);

 SELECT p.name AS planets, s.name AS stars, g.name AS galaxy, m.moons FROM planets_moons_stars pms 
  JOIN planets p ON planet_id=p.id 
  JOIN galaxies g ON pms.galaxy_id=g.id
  JOIN stars s ON star_id=s.id 
  JOIN moons m ON pms.moons_id=m.id;