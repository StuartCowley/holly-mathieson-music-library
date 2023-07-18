  CREATE TABLE Albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  releaseYear INT NOT NULL,
  artistId INT NULL,
  CONSTRAINT fk_artistId FOREIGN KEY(artistId) REFERENCES Artists(id)
  );