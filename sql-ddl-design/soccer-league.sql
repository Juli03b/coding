DROP DATABASE IF EXISTS soccer_league_db;
CREATE DATABASE soccer_league_db;
\c soccer_league_db;

CREATE TABLE ranks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    rank_id INT NOT NULL REFERENCES ranks 
);

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    team_id INT NOT NULL REFERENCES teams 
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    team1_id INT NOT NULL REFERENCES teams,
    team2_id INT NOT NULL REFERENCES teams,
    referee_id INT NOT NULL REFERENCES referees,
    date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE goals(
    id SERIAL PRIMARY KEY,
    player_id INT NOT NULL REFERENCES players,
    match_id INT REFERENCES matches,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seasons(
    id SERIAL PRIMARY KEY,
    start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ranks (name) 
    VALUES 
    ('Superhero'), 
    ('Ok'), 
    ('Baby');

INSERT INTO teams (name, rank_id) 
    VALUES 
    ('Peru', 1), 
    ('South Africa', 1), 
    ('Canada', 3), 
    ('Greenland', 2);

INSERT INTO players (name, team_id) 
    VALUES 
    ('Chris T', 1), 
    ('Kros Rick', 2), 
    ('Kanye West', 4), 
    ('Will On', 3), 
    ('Egg Os', 2);

INSERT INTO referees (name) VALUES ('Gabriel Manzana'), ('Steve Orange');

INSERT INTO matches (team1_id, team2_id, referee_id) 
    VALUES 
    (2, 1, 1),
    (4, 1, 2),
    (3, 2, 2);

INSERT INTO goals (player_id, match_id) 
    VALUES 
    (2, 1),
    (1, 1),
    (5, 1),
    (1, 2),
    (3, 2),
    (3, 2),
    (2, 3),
    (4, 3);

SELECT p.name AS players, t.name AS teams, g.date FROM goals g 
    JOIN players p on player_id=p.id 
    JOIN teams t ON team_id=t.id 
    JOIN matches m ON match_id=m.id;