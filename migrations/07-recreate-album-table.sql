  CREATE TABLE Albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  releaseYear SMALLINT NOT NULL,
  artist_id INT REFERENCES Artists(id) NOT NULL
);