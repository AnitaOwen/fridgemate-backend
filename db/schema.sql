-- db/schema.sql
DROP DATABASE IF EXISTS jwt_auth;

CREATE DATABASE jwt_auth;


\c jwt_auth


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fridges (
    id SERIAL PRIMARY KEY,
    location VARCHAR(30) NOT NULL,
    notes VARCHAR(500),
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    expiration_date DATE,
    amount_paid INTEGER,
    fridge_id INTEGER REFERENCES fridges(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    category_id INTEGER REFERENCES categories(id)
);

