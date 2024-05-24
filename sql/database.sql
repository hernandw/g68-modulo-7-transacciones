create database dinero_azul

create table usuarios (
id serial primary key,
first_name varchar(100),
last_name varchar(100),
email varchar(100),
saldo INT check (saldo >= 0)
);