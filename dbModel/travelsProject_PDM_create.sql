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
ALTER TABLE places ADD COLUMN category VARCHAR(50);

select * from users;

INSERT INTO users (id, email, password, type) VALUES
(1, 'johndoe@example.com', 'password123', 'regular'),
(2, 'janesmith@example.com', 'password123', 'regular'),
(3, 'alicejohnson@example.com', 'password123', 'regular'),
(4, 'bobbrown@example.com', 'password123', 'regular'),
(5, 'charliedavis@example.com', 'password123', 'regular'),
(6, 'dulcemariafabian@hotmail.com', 'password123', 'admin'),
(7, 'meumeroy@gmail.com', 'password123', 'admin'),
(8, 'gracegreen@example.com', 'password123', 'regular'),
(9, 'hannahblue@example.com', 'password123', 'regular'),
(10, 'ianorange@example.com', 'password123', 'regular');


INSERT INTO cities (id, name, img_url) VALUES
(1, 'Chicoana', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Iglesia_San_Pablo_de_Chicoana.jpg/220px-Iglesia_San_Pablo_de_Chicoana.jpg'),
(2, 'Cachi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Calle_en_Cachi.JPG/120px-Calle_en_Cachi.JPG'),
(3, 'Payogasta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Payogasta_361.JPG/320px-Payogasta_361.JPG'),
(4, 'Angastaco', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Eglise_Angastaco.JPG/220px-Eglise_Angastaco.JPG'),
(5, 'San Carlos', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/San_Carlos_524.JPG/320px-San_Carlos_524.JPG'),
(6, 'Animana', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/RN40-AR.svg/175px-RN40-AR.svg.png'),
(7, 'Cafayate', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Vi%C3%B1edoCafayate.jpg/120px-Vi%C3%B1edoCafayate.jpg'),
(8, 'Quebrada de Las Conchas', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tour_to_the_Quebrada_de_las_Conchas.jpg/120px-Tour_to_the_Quebrada_de_las_Conchas.jpg'),
(9, 'La ViÃ±a', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Esperando_%27el_pique%27_-_Pescadero_La_Isla_-_panoramio.jpg/250px-Esperando_%27el_pique%27_-_Pescadero_La_Isla_-_panoramio.jpg'),
(10, 'Dique Cabra Corral', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Embalse_Cabra_Corral_-_Presa_General_Manuel_Belgrano.jpg/300px-Embalse_Cabra_Corral_-_Presa_General_Manuel_Belgrano.jpg');



INSERT INTO profiles (id, name, dni, phone, users_id, cities_id) VALUES
(1, 'John Doe', '123456789', '+1234567890', 1, 1),
(2, 'Jane Smith', '987654321', '+0987654321', 2, 2),
(3, 'Alice Johnson', '456123789', '+4561237890', 3, 3),
(4, 'Bob Brown', '321654987', '+3216549870', 4, 4),
(5, 'Charlie Davis', '789456123', '+7894561230', 5, 5),
(6, 'Claudia Fabian', '29603678', '+5493875488978', 6, 6),
(7, 'Eugenia Roy', '22468314', '+5493874511380', 7, 7),
(8, 'Grace Green', '369258147', '+3692581470', 8, 8),
(9, 'Hannah Blue', '258369147', '+2583691470', 9, 9),
(10, 'Ian Orange', '963852741', '+9638527410', 10, 10);


INSERT INTO travels (id, name, start_date, end_date, cost) VALUES
(1, 'Chicoana de Festivales', '2024-08-01', '2024-08-02', 150.00),
(2, 'Cachi Encantado', '2024-08-05', '2024-08-07', 200.00),
(3, 'Tradicion de Payogasta', '2024-08-10', '2024-08-11', 180.00),
(4, 'Verde y Arena de Angastaco', '2024-08-15', '2024-08-16', 170.00),
(5, 'San Carlos Tour', '2024-08-20', '2024-08-22', 220.00),
(6, 'Animana Unica', '2024-08-25', '2024-09-27', 250.00),
(7, 'Cafayate Tierra de Vinos', '2024-09-01', '2024-09-05', 260.00),
(8, 'Esplendor de la Quebrada', '2024-09-05', '2024-09-06', 210.00),
(9, 'Mirador Guachipas', '2024-09-10', '2024-09-11', 230.00),
(10, 'La Magia del Dique', '2024-09-15', '2024-09-18', 190.00);


INSERT INTO promos (id, start_time, end_time, discount, travels_id) VALUES
(1, '2024-08-01 09:00:00', '2024-08-02 18:00:00', 10.00, 1),
(2, '2024-08-05 09:00:00', '2024-08-07 18:00:00', 15.00, 2),
(3, '2024-08-10 09:00:00', '2024-08-11 18:00:00', 10.00, 3),
(4, '2024-08-15 09:00:00', '2024-08-16 18:00:00', 10.00, 4),
(5, '2024-08-20 09:00:00', '2024-08-22 18:00:00', 15.00, 5),
(6, '2024-08-25 09:00:00', '2024-09-27 18:00:00', 15.00, 6),
(7, '2024-09-01 09:00:00', '2024-09-05 18:00:00', 20.00, 7),
(8, '2024-09-05 09:00:00', '2024-09-06 18:00:00', 10.00, 8),
(9, '2024-09-10 09:00:00', '2024-09-11 18:00:00', 10.00, 9),
(10, '2024-09-15 09:00:00', '2024-09-18 18:00:00', 15.00, 10);


INSERT INTO places (name, address, img_url, cities_id, category) VALUES
('Bo Hotel & Spa', 'Chicoana, SLA', 'https://media-cdn.tripadvisor.com/media/photo-s/07/c3/9e/cd/grounds-outside-room.jpg', 1, 'Hotel'),
('El Cortijo Hotel', 'Cachi, SLA', 'http://www.elcortijohotel.com/img/galeria/foto-1.jpg', 2, 'Hotel'),
('Sala de Payogasta', 'Payogasta, SLA', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/78/f5/c3/hotel.jpg?w=700&h=-1&s=1', 3, 'Hostel'),
('Hosteria Angastaco', 'Angastaco, SLA', 'https://media-cdn.tripadvisor.com/media/photo-s/18/66/c3/93/photo0jpg.jpg', 4, 'Hosteria'),
('CabaÃ±as Los Elementos', 'San Carlos, SLA', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ff/df/7d/caption.jpg?w=700&h=-1&s=1', 5, 'CabaÃ±as'),
('Camping Municipal de Animana', 'Animana, SLA', 'https://animanasalta.com.ar/ccm/app/image/municipalities/660385/entities/149/20201203_143933_Baja.jpg', 6, 'Camping'),
('Hotel Aires de Cafayate', 'Cafayate, SLA', 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/304079312.jpg?k=44de3962eacf0640814d8ce96db34ed663707f4d244cf4e38e7996d2c468b818&o=&hp=1', 7, 'Hotel'),
('CabaÃ±as Las Marias', 'Cafayate, SLA', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/b1/ed/e2/cabanas-las-maria.jpg?w=700&h=-1&s=1', 8, 'CabaÃ±as'),
('Hostal La ViÃ±a', 'La ViÃ±a, SLA', 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/209584207.jpg?k=8132a7327055feda00121fac2b468053fe221d5e8816d3caa3d4da828f28265c&o=&hp=1', 9, 'Hostel'),
('Hotel del Dique', 'Dique Cabra Corral, SLA', 'https://media-cdn.tripadvisor.com/media/photo-s/01/ee/2d/5d/vista-al-embalse-cabra.jpg', 10, 'Hotel');


-- Insertar datos en la tabla cities
INSERT INTO cities (name, img_url) VALUES
('Chicoana', 'hhttps://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Iglesia_San_Pablo_de_Chicoana.jpg/220px-Iglesia_San_Pablo_de_Chicoana.jpg'),
('Cachi', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Calle_en_Cachi.JPG/120px-Calle_en_Cachi.JPG'),
('Payogasta', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Payogasta_361.JPG/320px-Payogasta_361.JPG'),
('Angastaco', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Eglise_Angastaco.JPG/220px-Eglise_Angastaco.JPG'),
('San Carlos', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/San_Carlos_524.JPG/320px-San_Carlos_524.JPG'),
('Animana', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/RN40-AR.svg/175px-RN40-AR.svg.png'),
('Cafayate', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Vi%C3%B1edoCafayate.jpg/120px-Vi%C3%B1edoCafayate.jpg'),
('Quebrada de Las Conchas', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tour_to_the_Quebrada_de_las_Conchas.jpg/120px-Tour_to_the_Quebrada_de_las_Conchas.jpg'),
('La ViÃ±a', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Esperando_%27el_pique%27_-_Pescadero_La_Isla_-_panoramio.jpg/250px-Esperando_%27el_pique%27_-_Pescadero_La_Isla_-_panoramio.jpg'),
('Dique Cabra Corral', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Embalse_Cabra_Corral_-_Presa_General_Manuel_Belgrano.jpg/300px-Embalse_Cabra_Corral_-_Presa_General_Manuel_Belgrano.jpg');


-- Insertar datos en la tabla places
INSERT INTO places (name, address, img_url, cities_id, category) VALUES
('Quebrada de Tilian', 'Chicoana, SLA', 'https://media-cdn.tripadvisor.com/media/photo-m/1280/28/98/68/c2/quebrada-de-tilian.jpg', 1, 'Senderismo'),
('Cachi Adentro', 'Cachi, SLA', 'https://media-cdn.tripadvisor.com/media/photo-s/01/40/6a/f9/cachi-adentro.jpg', 2, 'Cabalgata'),
('Camino Inca', 'Payogasta, SLA', 'https://upload.wikimedia.org/wikipedia/commons/1/16/Potrero_de_Payogasta.jpg', 3, 'Trakking'),
('Pucara de Angastaco', 'Angastaco, SLA', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Yayno5.jpg/1200px-Yayno5.jpg', 4, 'Senderismo'),
('PeÃ±as Blancas', 'San Carlos, SLA', 'https://www.turismoruta40.com.ar/images/salta/sendero-el-cajoncillo.jpg', 5, 'Senderismo'),
('Tour Guiado', 'Animana, SLA', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/d4/2e/0d/a-paisagem.jpg?w=600&h=400&s=1', 6, 'Cabalgata'),
('Siete Cascadas', 'Cafayate, SLA', 'https://media-cdn.tripadvisor.com/media/photo-s/11/6e/a7/09/magnifique-cascade.jpg', 7, 'Senderismo'),
('Quebrada Trakking', 'Quebrada de Las Conchas, SLA', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Tour_to_the_Quebrada_de_las_Conchas.jpg/120px-Tour_to_the_Quebrada_de_las_Conchas.jpg', 8, 'Trakking'),
('Tour Guiado', 'La ViÃ±a, SLA', 'https://media-cdn.tripadvisor.com/media/photo-s/1d/58/68/79/iglesia-san-antonio-de.jpg', 9, 'Senderismo'),
('Caminata por El Dique', 'Dique Cabra Corral, SLA', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Cabra_corral.jpg/120px-Cabra_corral.jpg', 10, 'Senderismo');


INSERT INTO stops (id, stop_order, days, travels_id, cities_id, places_id) VALUES
(1, 1, 1, 1, 1, 1),
(2, 2, 2, 1, 2, 2),
(3, 1, 1, 2, 3, 3),
(4, 2, 1, 2, 4, 4),
(5, 1, 2, 3, 5, 5),
(6, 2, 2, 3, 6, 6),
(7, 1, 5, 4, 7, 7),
(8, 2, 1, 4, 8, 8),
(9, 1, 1, 5, 9, 9),
(10, 2, 3, 5, 10, 10);