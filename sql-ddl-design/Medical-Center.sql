-- Link to schema: https://dbdiagram.io/d/60456c69fcdcb6230b22ffda
DROP DATABASE IF EXISTS medical_center_db;
CREATE DATABASE medical_center_db;
\c medical_center_db

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  full_name varchar(30),
  phone_num TEXT
);

CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  full_name varchar(30) NOT NULL,
  phone_num int
);

CREATE TABLE sicknesses (
  id SERIAL PRIMARY KEY ,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  doc_id INT NOT NULL REFERENCES doctors,
  patient_id INT NOT NULL REFERENCES patients,
  diagnosis_id INT NOT NULL REFERENCES sicknesses,
  dates TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO doctors (full_name, phone_num) VALUES 
('james bond', '281723812'),
('Carlos Don', '919929332'),
('Donald Glover', '82712311');

INSERT INTO patients (full_name, phone_num) VALUES 
('Tala Mala', '780822365'),
('Aioli Ketchup', '690201759'),
('Jack Ketchup', '936925958');

INSERT INTO sicknesses (name, description) VALUES 
('No Eyes', 'No eyes anymore'),
('covid', 'coughing'),
('cold', 'coughing');

INSERT INTO logs (doc_id, patient_id, diagnosis_id) VALUES (3, 2, 1), (1, 3, 3);
INSERT INTO logs (doc_id, patient_id, diagnosis_id, dates) VALUES (1, 2, 3, '2038-01-09 03:14:07');

SELECT d.full_name AS Doctor, p.full_name AS Patient, s.name Disease, s.description AS Description, dates FROM logs l 
JOIN doctors d ON doc_id = d.id 
JOIN patients p ON patient_id = p.id 
JOIN sicknesses s ON diagnosis_id = s.id;