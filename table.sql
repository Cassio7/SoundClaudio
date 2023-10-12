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

create table artists(
    id int primary key AUTO_INCREMENT,
    name varchar(250)
);

create table albums(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    id_artist int,
    FOREIGN KEY (id_artist) REFERENCES artists(id)
);

create table songs(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    id_artist int,
    id_album int,
    durata float,
    mp3 varchar(250),
    FOREIGN KEY (id_album) REFERENCES albums(id),
    FOREIGN KEY (id_artist) REFERENCES artists(id)
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
-- The admin and cassio passwords are "Password1*" but with hash
insert into users(name,email,password,admin) value('Admin','admin@soundclaudio.com','$2b$10$z/jMQ6vU/AuItP/RitMwmeR0J6PBMxXuTuxTmpY.PIBWTuAh4kbD6','1');
insert into users(name,email,password,admin) value('Cassio','cassio@gmail.com','$2b$10$z/jMQ6vU/AuItP/RitMwmeR0J6PBMxXuTuxTmpY.PIBWTuAh4kbD6','0');

-- Artists

insert into artists(name) value('JID');
insert into artists(name) value('Travis Scott');

-- Albums
insert into albums(name, id_artist) value('DiCaprio2', 1);
insert into albums(name, id_artist) value('Utopia', 2);

-- Songs DiCaprio
insert into songs(name,id_artist,id_album,durata,mp3) value('Working Out',1,1,'3.46','\\mp3\\Workin_Out.mp3');

-- Songs Utopia
insert into songs(name,id_artist,id_album,durata,mp3) value('HYAENA',2,2,'3.42','\\mp3\\Workin_Out.mp3');
