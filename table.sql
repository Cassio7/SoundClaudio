--Query for database

DROP TABLE users, songs;

create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(250),
    password varchar(250),
    admin boolean,
    UNIQUE (email)
);

create table songs(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    artist_name varchar(250),
    id_user int,
    durata float,
    mp3 varchar(250),
    FOREIGN KEY (id_user) REFERENCES users(id)
);

insert into users(name,email,password,admin) value('Admin','admin@soundclaudio.it','password','1');

insert into songs(name,artist_name,durata,mp3) value('Working Out','JID','3.46','D:\\Angular\\soundclaudio\\mp3\\Workin_Out.mp3');