-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-07-21 23:23:35.244
drop database if exists db;
CREATE DATABASE if not exists db;
USE db;
-- tables
-- Table: cities
CREATE TABLE cities (
    id serial  NOT NULL,
    name varchar(255)  NOT NULL,
    img_url text  NOT NULL,
    CONSTRAINT cities_pk PRIMARY KEY (id)
);

-- Table: places
CREATE TABLE places (
    id serial  NOT NULL,
    name varchar(255)  NOT NULL,
    img_url text  NOT NULL,
    address varchar(255)  NOT NULL,
    cities_id bigint unsigned  NOT NULL,
    CONSTRAINT places_pk PRIMARY KEY (id)
);

-- Table: profiles
CREATE TABLE profiles (
    id serial  NOT NULL,
    name varchar(255)  NOT NULL,
    dni varchar(50)  NOT NULL,
    phone varchar(50)  NOT NULL,
    users_id bigint unsigned  NOT NULL,
    cities_id bigint unsigned  NOT NULL,
    CONSTRAINT profiles_pk PRIMARY KEY (id)
);

-- Table: promos
CREATE TABLE promos (
    id serial  NOT NULL,
    start_time datetime  NOT NULL,
    end_time datetime  NOT NULL,
    discount decimal(5,2)  NOT NULL,
    travels_id bigint unsigned  NOT NULL,
    CONSTRAINT promos_pk PRIMARY KEY (id)
);

-- Table: stops
CREATE TABLE stops (
    id serial  NOT NULL,
    stop_order int  NOT NULL,
    days int  NOT NULL,
    travels_id bigint unsigned  NOT NULL,
    cities_id bigint unsigned  NULL,
    places_id bigint unsigned  NULL,
    CONSTRAINT stops_pk PRIMARY KEY (id)
);

-- Table: travel_passenger
CREATE TABLE travel_passenger (
    travels_id bigint unsigned  NOT NULL,
    profiles_id bigint unsigned  NOT NULL,
    CONSTRAINT travel_passenger_pk PRIMARY KEY (travels_id,profiles_id)
);

-- Table: travels
CREATE TABLE travels (
    id serial  NOT NULL,
    name varchar(255)  NOT NULL,
    start_date date  NOT NULL,
    end_date date  NOT NULL,
    cost decimal(14,4)  NOT NULL,
    CONSTRAINT travels_pk PRIMARY KEY (id)
);

-- Table: users
CREATE TABLE users (
    id serial  NOT NULL,
    email varchar(50)  NOT NULL,
    password varchar(50)  NOT NULL,
    type varchar(50)  NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: places_cities (table: places)
ALTER TABLE places ADD CONSTRAINT places_cities FOREIGN KEY places_cities (cities_id)
    REFERENCES cities (id);

-- Reference: profiles_cities (table: profiles)
ALTER TABLE profiles ADD CONSTRAINT profiles_cities FOREIGN KEY profiles_cities (cities_id)
    REFERENCES cities (id);

-- Reference: profiles_users (table: profiles)
ALTER TABLE profiles ADD CONSTRAINT profiles_users FOREIGN KEY profiles_users (users_id)
    REFERENCES users (id);

-- Reference: promos_travels (table: promos)
ALTER TABLE promos ADD CONSTRAINT promos_travels FOREIGN KEY promos_travels (travels_id)
    REFERENCES travels (id);

-- Reference: stops_cities (table: stops)
ALTER TABLE stops ADD CONSTRAINT stops_cities FOREIGN KEY stops_cities (cities_id)
    REFERENCES cities (id);

-- Reference: stops_places (table: stops)
ALTER TABLE stops ADD CONSTRAINT stops_places FOREIGN KEY stops_places (places_id)
    REFERENCES places (id);

-- Reference: stops_travels (table: stops)
ALTER TABLE stops ADD CONSTRAINT stops_travels FOREIGN KEY stops_travels (travels_id)
    REFERENCES travels (id);

-- Reference: travel_passenger_profiles (table: travel_passenger)
ALTER TABLE travel_passenger ADD CONSTRAINT travel_passenger_profiles FOREIGN KEY travel_passenger_profiles (profiles_id)
    REFERENCES profiles (id);

-- Reference: travel_passenger_travels (table: travel_passenger)
ALTER TABLE travel_passenger ADD CONSTRAINT travel_passenger_travels FOREIGN KEY travel_passenger_travels (travels_id)
    REFERENCES travels (id);

-- End of file.


select * from users;


INSERT INTO users (id, email, password, type) VALUES
(1, 'johndoe@example.com', 'password123', 'regular'),
(2, 'janesmith@example.com', 'password123', 'regular'),
(3, 'alicejohnson@example.com', 'password123', 'regular'),
(4, 'bobbrown@example.com', 'password123', 'regular'),
(5, 'charliedavis@example.com', 'password123', 'regular'),
(6, 'emilywhite@example.com', 'password123', 'admin'),
(7, 'frankblack@example.com', 'password123', 'admin'),
(8, 'gracegreen@example.com', 'password123', 'admin'),
(9, 'hannahblue@example.com', 'password123', 'regular'),
(10, 'ianorange@example.com', 'password123', 'regular');


INSERT INTO cities (id, name, img_url) VALUES
(1, 'New York', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/2560px-New_york_times_square-terabass.jpg'),
(2, 'Los Angeles', 'https://a.travel-assets.com/findyours-php/viewfinder/images/res40/475000/475457-Los-Angeles.jpg'),
(3, 'Chicago', 'https://cdn.pixabay.com/photo/2016/11/06/23/51/buildings-1804479_640.jpg'),
(4, 'Houston', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Panoramic_Houston_skyline.jpg/1024px-Panoramic_Houston_skyline.jpg'),
(5, 'Phoenix', 'https://example.com/phoenix.jpg'),
(6, 'Philadelphia', 'https://example.com/philly.jpg'),
(7, 'San Antonio', 'https://example.com/san_antonio.jpg'),
(8, 'San Diego', 'https://example.com/san_diego.jpg'),
(9, 'Dallas', 'https://example.com/dallas.jpg'),
(10, 'San Jose', 'https://example.com/san_jose.jpg');

INSERT INTO profiles (id, name, dni, phone, users_id, cities_id) VALUES
(1, 'John Doe', '123456789', '+1234567890', 1, 1),
(2, 'Jane Smith', '987654321', '+0987654321', 2, 2),
(3, 'Alice Johnson', '456123789', '+4561237890', 3, 3),
(4, 'Bob Brown', '321654987', '+3216549870', 4, 4),
(5, 'Charlie Davis', '789456123', '+7894561230', 5, 5),
(6, 'Emily White', '654321789', '+6543217890', 6, 6),
(7, 'Frank Black', '147258369', '+1472583690', 7, 7),
(8, 'Grace Green', '369258147', '+3692581470', 8, 8),
(9, 'Hannah Blue', '258369147', '+2583691470', 9, 9),
(10, 'Ian Orange', '963852741', '+9638527410', 10, 10);




INSERT INTO travels (id, name, start_date, end_date, cost) VALUES
(1, 'East Coast Adventure', '2024-08-01', '2024-08-10', 1500.00),
(2, 'West Coast Expedition', '2024-08-05', '2024-08-15', 2000.00),
(3, 'Midwest Journey', '2024-08-10', '2024-08-20', 1800.00),
(4, 'Southern Tour', '2024-08-15', '2024-08-25', 1700.00),
(5, 'Northern Lights', '2024-08-20', '2024-08-30', 2200.00),
(6, 'Coastal Cruise', '2024-08-25', '2024-09-05', 2500.00),
(7, 'Desert Discovery', '2024-09-01', '2024-09-10', 1600.00),
(8, 'Mountain Retreat', '2024-09-05', '2024-09-15', 2100.00),
(9, 'Lakeside Leisure', '2024-09-10', '2024-09-20', 2300.00),
(10, 'City Sights', '2024-09-15', '2024-09-25', 1900.00);



INSERT INTO promos (id, start_time, end_time, discount, travels_id) VALUES
(1, '2024-08-01 09:00:00', '2024-08-10 18:00:00', 10.00, 1),
(2, '2024-08-05 09:00:00', '2024-08-15 18:00:00', 15.00, 2),
(3, '2024-08-10 09:00:00', '2024-08-20 18:00:00', 20.00, 3),
(4, '2024-08-15 09:00:00', '2024-08-25 18:00:00', 25.00, 4),
(5, '2024-08-20 09:00:00', '2024-08-30 18:00:00', 30.00, 5),
(6, '2024-08-25 09:00:00', '2024-09-05 18:00:00', 35.00, 6),
(7, '2024-09-01 09:00:00', '2024-09-10 18:00:00', 40.00, 7),
(8, '2024-09-05 09:00:00', '2024-09-15 18:00:00', 45.00, 8),
(9, '2024-09-10 09:00:00', '2024-09-20 18:00:00', 50.00, 9),
(10, '2024-09-15 09:00:00', '2024-09-25 18:00:00', 55.00, 10);




INSERT INTO travel_passenger (travels_id, profiles_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 7),
(4, 8),
(5, 9),
(5, 10);


ALTER TABLE places ADD COLUMN category VARCHAR(50);


INSERT INTO places (name, address, img_url, cities_id, category) VALUES
('Central Park Hotel', 'New York, NY', 'http://example.com/images/centralparkhotel.jpg', 1, 'Hotel'),
('Hollywood Hostel', 'Los Angeles, CA', 'http://example.com/images/hollywoodhostel.jpg', 2, 'Hostel'),
('Chicago Camping', 'Chicago, IL', 'http://example.com/images/chicagocamping.jpg', 3, 'Camping'),
('Houston Hotel', 'Houston, TX', 'http://example.com/images/houstonhotel.jpg', 4, 'Hotel'),
('Phoenix Hostel', 'Phoenix, AZ', 'http://example.com/images/phoenixhostel.jpg', 5, 'Hostel'),
('Philadelphia Camping', 'Philadelphia, PA', 'http://example.com/images/philadelphiacamping.jpg', 6, 'Camping'),
('San Antonio Hotel', 'San Antonio, TX', 'http://example.com/images/sanantoniohotel.jpg', 7, 'Hotel'),
('San Diego Hostel', 'San Diego, CA', 'http://example.com/images/sandiegohostel.jpg', 8, 'Hostel'),
('Dallas Camping', 'Dallas, TX', 'http://example.com/images/dallascamping.jpg', 9, 'Camping'),
('San Jose Hotel', 'San Jose, CA', 'http://example.com/images/sanjosehotel.jpg', 10, 'Hotel');


-- Insertar datos en la tabla cities
INSERT INTO cities (name, img_url) VALUES
('New York', 'http://example.com/images/ny.jpg'),
('Los Angeles', 'http://example.com/images/la.jpg'),
('Chicago', 'http://example.com/images/chicago.jpg'),
('Houston', 'http://example.com/images/houston.jpg'),
('Phoenix', 'http://example.com/images/phoenix.jpg'),
('Philadelphia', 'http://example.com/images/philadelphia.jpg'),
('San Antonio', 'http://example.com/images/sanantonio.jpg'),
('San Diego', 'http://example.com/images/sandiego.jpg'),
('Dallas', 'http://example.com/images/dallas.jpg'),
('San Jose', 'http://example.com/images/sanjose.jpg');

-- Insertar datos en la tabla places
INSERT INTO places (name, address, img_url, cities_id, category) VALUES
('Central Park Hiking', 'New York, NY', 'http://example.com/images/centralparkhiking.jpg', 1, 'Senderismo'),
('Hollywood Horse Riding', 'Los Angeles, CA', 'http://example.com/images/hollywoodhorseriding.jpg', 2, 'Cabalgata'),
('Chicago Trakking', 'Chicago, IL', 'http://example.com/images/chicagotrekking.jpg', 3, 'Trakking'),
('Houston Hiking', 'Houston, TX', 'http://example.com/images/houstonhiking.jpg', 4, 'Senderismo'),
('Phoenix Horse Riding', 'Phoenix, AZ', 'http://example.com/images/phoenixhorseriding.jpg', 5, 'Cabalgata'),
('Philadelphia Trakking', 'Philadelphia, PA', 'http://example.com/images/philadelphiatrekking.jpg', 6, 'Trakking'),
('San Antonio Hiking', 'San Antonio, TX', 'http://example.com/images/sanantoniohiking.jpg', 7, 'Senderismo'),
('San Diego Horse Riding', 'San Diego, CA', 'http://example.com/images/sandiegohorseriding.jpg', 8, 'Cabalgata'),
('Dallas Trakking', 'Dallas, TX', 'http://example.com/images/dallastrekking.jpg', 9, 'Trakking'),
('San Jose Hiking', 'San Jose, CA', 'http://example.com/images/sanjosehiking.jpg', 10, 'Senderismo');




INSERT INTO stops (id, stop_order, days, travels_id, cities_id, places_id) VALUES
(1, 1, 2, 1, 1, 1),
(2, 2, 1, 1, 2, 2),
(3, 1, 3, 2, 3, 3),
(4, 2, 2, 2, 4, 4),
(5, 1, 1, 3, 5, 5),
(6, 2, 3, 3, 6, 6),
(7, 1, 2, 4, 7, 7),
(8, 2, 1, 4, 8, 8),
(9, 1, 4, 5, 9, 9),
(10, 2, 2, 5, 10, 10);