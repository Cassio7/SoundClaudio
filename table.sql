--Query for database

DROP TABLE users, albums, songs, libraries, comments, artists;

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
    img varchar(250),
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
insert into albums(name, img ,id_artist) value('DiCaprio2','', 1);
insert into albums(name, img ,id_artist) value('Utopia','../assets/img/utopia.jpg', 2);

-- Songs DiCaprio
insert into songs(name,id_artist,id_album,durata,mp3) value('Working Out',1,1,'3.46','../assets/mp3/Working_Out.mp3');

-- Songs Utopia
insert into songs(name,id_artist,id_album,durata,mp3) value('HYAENA',2,2,'3.42','../assets/mp3/Utopia/HYAENA.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('THANK GOD',2,2,'3.04','../assets/mp3/Utopia/THANK.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('MODERN JAM',2,2,'4.15','../assets/mp3/Utopia/MODERN.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('MY EYES',2,2,'4.11','../assets/mp3/Utopia/MY.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('GODS COUNTRY',2,2,'2.07','../assets/mp3/Utopia/GODS.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('SIRENS',2,2,'3.24','../assets/mp3/Utopia/SIRENS.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('MELTDOWN',2,2,'4.06','../assets/mp3/Utopia/MELTDOWN.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('FE!N',2,2,'3.11','../assets/mp3/Utopia/FE!N.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('DELRESTO',2,2,'4.34','../assets/mp3/Utopia/DELRESTO.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('I KNOW ?',2,2,'3.31','../assets/mp3/Utopia/KNOW.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('TOPIA TWINS',2,2,'3.43','../assets/mp3/Utopia/TOPIA.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('CIRCUS MAXIMUX',2,2,'4.18','../assets/mp3/Utopia/CIRCUS.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('PARASAIL',2,2,'2.34','../assets/mp3/Utopia/PARASAIL.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('SKITZO',2,2,'6.06','../assets/mp3/Utopia/SKITZO.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('LOST FOREVER',2,2,'2.43','../assets/mp3/Utopia/LOST.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('LOOOVE',2,2,'3.46','../assets/mp3/Utopia/LOOOVE.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('K-POP',2,2,'3.05','../assets/mp3/Utopia/K-POP.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('TELEKINESIS',2,2,'5.54','../assets/mp3/Utopia/TELEKINESIS.mp3');
insert into songs(name,id_artist,id_album,durata,mp3) value('TIL FURTHER NOTICE',2,2,'5.14','../assets/mp3/Utopia/TIL.mp3');