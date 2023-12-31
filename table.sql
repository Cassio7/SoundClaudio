-- Query for database

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
    FOREIGN KEY (id_artist) REFERENCES artists(id) ON DELETE CASCADE
);

create table songs(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    id_artist int,
    id_user int,
    id_album int,
    mp3 varchar(250),
    FOREIGN KEY (id_album) REFERENCES albums(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_artist) REFERENCES artists(id) ON DELETE CASCADE
);

create table libraries(
    id int primary key AUTO_INCREMENT,
    id_user int,
    id_song int,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_song) REFERENCES songs(id) ON DELETE CASCADE
);

create table comments(
    id int primary key AUTO_INCREMENT,
    id_user int,
    id_song int,
    comment text,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_song) REFERENCES songs(id) ON DELETE CASCADE
);

-- The admin and cassio passwords are "Password1*" but with hash

insert into users(name,email,password,admin) value('Admin','admin@soundclaudio.com','$2b$10$z/jMQ6vU/AuItP/RitMwmeR0J6PBMxXuTuxTmpY.PIBWTuAh4kbD6','1');
insert into users(name,email,password,admin) value('Cassio','cassio@gmail.com','$2b$10$z/jMQ6vU/AuItP/RitMwmeR0J6PBMxXuTuxTmpY.PIBWTuAh4kbD6','0');
insert into users(name,email,password,admin) value('Paolo','paolo@gmail.com','$2b$10$z/jMQ6vU/AuItP/RitMwmeR0J6PBMxXuTuxTmpY.PIBWTuAh4kbD6','0');

-- Artists

insert into artists(name) value('JID');
insert into artists(name) value('Travis Scott');
insert into artists(name) value('More Artists');
insert into artists(name) value('SZA');
insert into artists(name) value('Mac Miller');

-- Albums

insert into albums(name, img ,id_artist) value('The Forever Story','../assets/img/forever.png', 1);
insert into albums(name, img ,id_artist) value('Utopia','../assets/img/utopia.jpg', 2);
insert into albums(name, img ,id_artist) value('Users songs','../assets/img/user.png', 3);
insert into albums(name, img ,id_artist) value('SOS','../assets/img/sos.png', 4);
insert into albums(name, img ,id_artist) value('The Divine Feminine','../assets/img/divine.jpg', 5);

-- SongsForever

insert into songs(name,id_artist,id_album,mp3) value('Galaxy',1,1,'../assets/mp3/Forever/Galaxy.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Raydar',1,1,'../assets/mp3/Forever/Raydar.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Dance Now',1,1,'../assets/mp3/Forever/Dance.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Crack Sandwich',1,1,'../assets/mp3/Forever/Crack.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Cant Punk Me',1,1,'../assets/mp3/Forever/Cant.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Surround Sound',1,1,'../assets/mp3/Forever/Surround.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Kody Blu 31',1,1,'../assets/mp3/Forever/Kody.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Bruddanem',1,1,'../assets/mp3/Forever/Bruddanem.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Sistanem',1,1,'../assets/mp3/Forever/Sistanem.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Cant Make U Change',1,1,'../assets/mp3/Forever/Change.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Stars',1,1,'../assets/mp3/Forever/Stars.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Just In Time',1,1,'../assets/mp3/Forever/Just.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Money',1,1,'../assets/mp3/Forever/Money.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Better Days',1,1,'../assets/mp3/Forever/Better.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Lauder Too',1,1,'../assets/mp3/Forever/Lauder.mp3');


-- SongsUtopia

insert into songs(name,id_artist,id_album,mp3) value('HYAENA',2,2,'../assets/mp3/Utopia/HYAENA.mp3');
insert into songs(name,id_artist,id_album,mp3) value('THANK GOD',2,2,'../assets/mp3/Utopia/THANK.mp3');
insert into songs(name,id_artist,id_album,mp3) value('MODERN JAM',2,2,'../assets/mp3/Utopia/MODERN.mp3');
insert into songs(name,id_artist,id_album,mp3) value('MY EYES',2,2,'../assets/mp3/Utopia/MY.mp3');
insert into songs(name,id_artist,id_album,mp3) value('GODS COUNTRY',2,2,'../assets/mp3/Utopia/GODS.mp3');
insert into songs(name,id_artist,id_album,mp3) value('SIRENS',2,2,'../assets/mp3/Utopia/SIRENS.mp3');
insert into songs(name,id_artist,id_album,mp3) value('MELTDOWN',2,2,'../assets/mp3/Utopia/MELTDOWN.mp3');
insert into songs(name,id_artist,id_album,mp3) value('FE!N',2,2,'../assets/mp3/Utopia/FE!N.mp3');
insert into songs(name,id_artist,id_album,mp3) value('DELRESTO',2,2,'../assets/mp3/Utopia/DELRESTO.mp3');
insert into songs(name,id_artist,id_album,mp3) value('I KNOW ?',2,2,'../assets/mp3/Utopia/KNOW.mp3');
insert into songs(name,id_artist,id_album,mp3) value('TOPIA TWINS',2,2,'../assets/mp3/Utopia/TOPIA.mp3');
insert into songs(name,id_artist,id_album,mp3) value('CIRCUS MAXIMUX',2,2,'../assets/mp3/Utopia/CIRCUS.mp3');
insert into songs(name,id_artist,id_album,mp3) value('PARASAIL',2,2,'../assets/mp3/Utopia/PARASAIL.mp3');
insert into songs(name,id_artist,id_album,mp3) value('SKITZO',2,2,'../assets/mp3/Utopia/SKITZO.mp3');
insert into songs(name,id_artist,id_album,mp3) value('LOST FOREVER',2,2,'../assets/mp3/Utopia/LOST.mp3');
insert into songs(name,id_artist,id_album,mp3) value('LOOOVE',2,2,'../assets/mp3/Utopia/LOOOVE.mp3');
insert into songs(name,id_artist,id_album,mp3) value('K-POP',2,2,'../assets/mp3/Utopia/K-POP.mp3');
insert into songs(name,id_artist,id_album,mp3) value('TELEKINESIS',2,2,'../assets/mp3/Utopia/TELEKINESIS.mp3');
insert into songs(name,id_artist,id_album,mp3) value('TIL FURTHER NOTICE',2,2,'../assets/mp3/Utopia/TIL.mp3');

-- SongsSOS

insert into songs(name,id_artist,id_album,mp3) value('SOS',4,4,'../assets/mp3/SOS/SOS.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Kill Bill',4,4,'../assets/mp3/SOS/Kill.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Seek and Destroy',4,4,'../assets/mp3/SOS/Seek.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Low',4,4,'../assets/mp3/SOS/Low.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Love Language',4,4,'../assets/mp3/SOS/Love.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Blind',4,4,'../assets/mp3/SOS/Blind.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Used',4,4,'../assets/mp3/SOS/Used.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Snooze',4,4,'../assets/mp3/SOS/Snooze.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Notice Me',4,4,'../assets/mp3/SOS/Notice.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Gone Girl',4,4,'../assets/mp3/SOS/Gone.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Smoking on my Ex Pack',4,4,'../assets/mp3/SOS/Smoking.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Ghost in the Machine',4,4,'../assets/mp3/SOS/Ghost.mp3');
insert into songs(name,id_artist,id_album,mp3) value('F2F',4,4,'../assets/mp3/SOS/F2F.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Nobody Gets Me',4,4,'../assets/mp3/SOS/Nobody.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Conceited',4,4,'../assets/mp3/SOS/Conceited.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Special',4,4,'../assets/mp3/SOS/Special.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Too Late',4,4,'../assets/mp3/SOS/Too.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Far',4,4,'../assets/mp3/SOS/Far.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Shirt',4,4,'../assets/mp3/SOS/Shirt.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Open Arms',4,4,'../assets/mp3/SOS/Open.mp3');
insert into songs(name,id_artist,id_album,mp3) value('I Hate U',4,4,'../assets/mp3/SOS/Hate.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Good Days',4,4,'../assets/mp3/SOS/Good.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Forgiveless',4,4,'../assets/mp3/SOS/Forgiveless.mp3');

-- SongsDivine

insert into songs(name,id_artist,id_album,mp3) value('Congratulations',5,5,'../assets/mp3/Divine/Congratulations.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Dang!',5,5,'../assets/mp3/Divine/Dang!.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Stay',5,5,'../assets/mp3/Divine/Stay.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Skin',5,5,'../assets/mp3/Divine/Skin.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Cinderella',5,5,'../assets/mp3/Divine/Cinderella.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Planet God Damn',5,5,'../assets/mp3/Divine/Planet.mp3');
insert into songs(name,id_artist,id_album,mp3) value('Soulmate',5,5,'../assets/mp3/Divine/Soulmate.mp3');
insert into songs(name,id_artist,id_album,mp3) value('We',5,5,'../assets/mp3/Divine/We.mp3');
insert into songs(name,id_artist,id_album,mp3) value('My Favourite Part',5,5,'../assets/mp3/Divine/My.mp3');
insert into songs(name,id_artist,id_album,mp3) value('God Is Fair, Sexy Nasty',5,5,'../assets/mp3/Divine/God.mp3');

-- Comments test
insert into comments(id_user, id_song, comment) value(2,1,"Hitttttt");
