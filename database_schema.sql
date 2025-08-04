-- MySQL Database Schema for Railway
-- Users and Houses Management System

-- Users table
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15)
);

-- Houses table
CREATE TABLE houses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  owner_id BIGINT,
  type VARCHAR(10),
  phone_number VARCHAR(15),
  district VARCHAR(50),
  city VARCHAR(50),
  image_data LONGBLOB,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Indexes for better performance
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_houses_owner_id ON houses(owner_id);
CREATE INDEX idx_houses_district ON houses(district);
CREATE INDEX idx_houses_city ON houses(city);