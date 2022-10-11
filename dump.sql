CREATE DATABASE shortly;

CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(25) NOT NULL,
    "email" VARCHAR(25) UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE urls (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES "users"("id"),
    "url" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "visitCount" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);