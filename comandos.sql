
--  Ex: 02 - criação da tabela clients


create table clients (
	id serial primary key,
	name varchar(150) not null,
	email varchar(150) unique not null,
	cpf varchar(50) unique not null,
	contact varchar(20) not null
)

-- Exercicio 3 - criação da tabela categorias
create table categories (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(150) not null
)

insert INTO categories (nome)
		
		Values
		('Jogos'),
		('Alimentos'),
		('Mobilia'),
		('Smartphones'),
		('Higiene&limpeza'),
		('Pets'),
		('Vestuario'),
		('Eletronicos'),
		('Outros')

	-- criação da tabela produtos
	create table products (
		id SERIAL PRIMARY KEY,
		nome VARCHAR(150) not null,
		amount INTEGER default 0,
		color VARCHAR(50),
		voltage NUMERIC(3, 0),
		description TEXT,
		category_id INTEGER not null,
		FOREIGN KEY (category_id) REFERENCES categories (id)
	)


