--Query for database

DROP TABLE users, albums, songs, libraries, comments;

create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(250),
    password varchar(250),
    admin boolean,
    UNIQUE (email)
);

create table albums(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    artist_name varchar(250)
);

create table songs(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    artist_name varchar(250),
    id_album int,
    durata float,
    mp3 varchar(250),
    FOREIGN KEY (id_album) REFERENCES albums(id)
);

create table libraries(
    id int primary key AUTO_INCREMENT,
    id_user int,
    id_song int,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_song) REFERENCES songs(id)
);

create table comments(
    id int primary key AUTO_INCREMENT,
    id_user int,
    id_song int,
    comment text,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_song) REFERENCES songs(id)
);
-- The admin password is "password" but with hash
insert into users(name,email,password,admin) value('Admin','admin@soundclaudio.it','$2b$10$FRf91ll8eyB3hU3h22C68ukze6Ff60MZMAlivv6HDVmwWZgta2bU6','1');

insert into songs(name,artist_name,durata,mp3) value('Working Out','JID','3.46','D:\\Angular\\soundclaudio\\mp3\\Workin_Out.mp3');