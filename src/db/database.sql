CREATE DATABASE beta;

CREATE TYPE status_active AS ENUM ('active', 'inactive');

CREATE TABLE category (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status status_active DEFAULT 'active'
);

CREATE TABLE product (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    image VARCHAR NOT NULL,
    category_id UUID NOT NULL REFERENCES category(id),
    status status_active DEFAULT 'active'
);


CREATE TABLE news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR NOT NULL,
    status status_active DEFAULT 'active'
);


