--create users table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
)
--create the main news table
CREATE TABLE IF NOT EXISTS news_table(
    news_id    SERIAL PRIMARY KEY,
    news_author  VARCHAR(50) NOT NULL,
    news_body        TEXT NOT NULL
)
