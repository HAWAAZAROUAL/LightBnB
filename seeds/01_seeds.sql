-- DATA FOR USERS
INSERT INTO users (name, email, password)
VALUES ('Cherry', 'cher@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Berry', 'blue@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Larry', 'larry@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- DATA FOR PROPERTIES
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES(1, 'Blank corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 1, 1, 'Canada', 'street1', 'Vancouver', 'British Columbia', '28142', TRUE),
(2, 'Cozy place', 'description','https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 2, 2, 'Canada', 'street2', 'Vancouver', 'British Columbia', '28143', TRUE),
(3, 'Modern Style', 'description','https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 3, 3, 'Canada', 'street3', 'Vancouver', 'British Columbia', '28144', TRUE);


-- DATA FOR RESERVATIONS
INSERT INTO reservations (property_id, guest_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3,3, '2021-10-01', '2021-10-14')


-- DATA FOR PROPERTY_REVIEWS
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 10, 3, 'messages'), (2,2,1,4, 'messages'),(3,3,5,6, 'messages') 