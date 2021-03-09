-- from the terminal run:
-- psql < air_traffic.sql

DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic


CREATE TABLE airlines (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_num TEXT NOT NULL
);

CREATE TABLE tickets
(
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers,
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline_id INT NOT NULL REFERENCES airlines,
  to_city TEXT NOT NULL,
  to_country TEXT NOT NULL
);

INSERT INTO airlines (name, city, country) VALUES 
('United', 'Washington DC', 'United States'),
('British Airways', 'Tokyo', 'Japan'),
('Delta', 'Los Angeles', 'United States'),
('Delta', 'Seattle', 'United States'),
('TUI Fly Belgium', 'Paris', 'France'),
('Air China', 'Dubai', 'UAE'),
('United', 'New York', 'United States'),
('American Airlines', 'Cedar Rapids', 'United States'),
('American Airlines', 'Charlotte', 'United States'),
('Avianca Brasil', 'Sao Paolo', 'Brazil');

INSERT INTO customers (first_name, last_name, phone_num) VALUES 
('Jennifer', 'Finch', '315874453'),
('Thadeus', 'Gathercoal', '511538501'),
('Sonja', 'Pauley', '281324199'),
('Waneta', 'Skeleton', '370847921'),
('Berkie', 'Wycliff', '866515566'),
('Alvin', 'Leathes', '132735655'),
('Cory', 'Squibbes', '688079877');

INSERT INTO tickets (customer_id, seat, departure, arrival, airline_id, to_city, to_country) VALUES
  ( 1, '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 'Seattle', 'United States'),
  ( 2, '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 2, 'London', 'United Kingdom'),
  ( 3, '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 3 , 'Las Vegas', 'United States'),
  ( 1, '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 4, 'Mexico City', 'Mexico'),
  ( 4, '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 5, 'Casablanca', 'Morocco'),
  ( 2, '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 6, 'Beijing', 'China'),
  ( 5 , '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 7, 'Charlotte', 'United States'),
  ( 6, '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 8, 'Chicago', 'United States'),
  ( 6, '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 9, 'New Orleans', 'United States'),
  ( 7, '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 10, 'Santiago', 'Chile');

SELECT CONCAT(first_name,' ', last_name) AS customer, phone_num, a.name, CONCAT(a.city, ', ', country) AS from, 
CONCAT(to_city, ', ', to_country) AS to, seat , departure, arrival FROM tickets t 
 JOIN customers c ON customer_id=c.id 
 JOIN airlines a ON airline_id=a.id;