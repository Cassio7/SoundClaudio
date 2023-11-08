# SoundClaudio
Replica of SoundCloud for educational purpose

## What you need
The project is made with Angular, NodeJS and MYSQL.
After clone the repo you need to follow this steps to test and try this project.
- First thing first is crate your database so go inside MYSQL and write `CREATE DATABASE soundclaudio;`.
- Now set your database with `USE soundclaudio;`,  open the file *table.sql* and copy all the query **exept the first one**.
- After that you need to create a *.env* file inside the folder, and put this info inside it (replace **INFO** with your informations):

```
//Server
PORT = 8080

//Connection
DB_PORT = 3306
DB_HOST = localhost
DB_USERNAME = INFO
DB_PASSWORD = INFO
DB_NAME = soundclaudio

//JWT
TOKEN_KEY = 09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611

```
- Of course you need to `npm install` all the dependency on both parts, so use that command on the main folder and inside frontend folder!

## Runn
For execute backend: `npm start`

For execute the frontend (inside the frontend folder): `ng serve`

## Disclaimer
This project incorporates copyrighted music files for educational purposes as part of a SoundClaudio is a university project designed to 
simulate features of a music-sharing platform like SoundCloud for 
educational and demonstration purposes only. 
The project utilizes certain copyrighted images from SoundCloud 
solely to showcase design and functionality concepts.
Also incorporates copyrighted music files for educational purposes.
No commercial use or distribution of these copyrighted materials is intended.