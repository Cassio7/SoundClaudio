create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(250),
    password varchar(250),
    admin boolean,
    UNIQUE (email)
);

insert into users(name,email,password,admin) value('Admin','admin@soundclaudio.it','password','1');