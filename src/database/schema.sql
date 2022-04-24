CREATE DATABASE cryptofolio;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS assets (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  crypto VARCHAR NOT NULL,
  amount NUMERIC NOT NULL
);
