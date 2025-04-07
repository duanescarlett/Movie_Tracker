CREATE TYPE UserRole AS ENUM ('USER', 'ADMIN');

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    role UserRole DEFAULT 'USER' NOT NULL
);

CREATE TABLE Studio (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    runtime INT NOT NULL,
    plot TEXT NOT NULL,
    poster VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    studio_id INT,
    CONSTRAINT fk_movie_studio FOREIGN KEY (studio_id) REFERENCES Studio(id) ON DELETE SET NULL
);

CREATE TABLE Actor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    birth_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE MovieActor (
    movie_id INT,
    actor_id INT,
    PRIMARY KEY (movie_id, actor_id),
    CONSTRAINT fk_movie_actor_movie FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE,
    CONSTRAINT fk_movie_actor_actor FOREIGN KEY (actor_id) REFERENCES Actor(id) ON DELETE CASCADE
);

CREATE TABLE Director (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    birth_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE MovieDirector (
    movie_id INT,
    director_id INT,
    PRIMARY KEY (movie_id, director_id),
    CONSTRAINT fk_movie_director_movie FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE,
    CONSTRAINT fk_movie_director_director FOREIGN KEY (director_id) REFERENCES Director(id) ON DELETE CASCADE
);

CREATE TABLE Genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE MovieGenre (
    movie_id INT,
    genre_id INT,
    PRIMARY KEY (movie_id, genre_id),
    CONSTRAINT fk_movie_genre_movie FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE,
    CONSTRAINT fk_movie_genre_genre FOREIGN KEY (genre_id) REFERENCES Genre(id) ON DELETE CASCADE
);

CREATE TABLE Rating (
    id SERIAL PRIMARY KEY,
    movie_id INT NOT NULL,
    source TEXT NOT NULL,
    rating DECIMAL NOT NULL,
    user_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_rating_movie FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE,
    CONSTRAINT fk_rating_user FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE SET NULL,
    CONSTRAINT unique_personal_rating UNIQUE (movie_id, user_id)
);

CREATE TABLE UserAction (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    movie_id INT NOT NULL,
    watched_on TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_useraction_user FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE,
    CONSTRAINT fk_useraction_movie FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_movie UNIQUE (user_id, movie_id)
);

CREATE TABLE MovieComment (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    movie_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_moviecomment_user FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE,
    CONSTRAINT fk_moviecomment_movie FOREIGN KEY (movie_id) REFERENCES Movie(id) ON DELETE CASCADE
);

-- Indexes for Performance
CREATE INDEX idx_movie_title ON Movie(title);
CREATE INDEX idx_actor_name ON Actor(name);
CREATE INDEX idx_director_name ON Director(name);
CREATE INDEX idx_genre_name ON Genre(name);

-- Function to Automatically Update `updated_at` Timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to Update `updated_at` Automatically
CREATE TRIGGER set_timestamp_users
BEFORE UPDATE ON "User"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_movies
BEFORE UPDATE ON Movie
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_ratings
BEFORE UPDATE ON Rating
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER set_timestamp_movie_comments
BEFORE UPDATE ON MovieComment
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
