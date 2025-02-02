
--  Ex: 02 - criação da tabela clients


create table clients (
	id serial primary key,
	name varchar(150) not null,
	email varchar(150) unique not null,
	cpf varchar(50) unique not null,
	contact varchar(20) not null
)

-- Ex: 03 - criação da tabela categorias
create table categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(150) not null
)

insert INTO categories (name) Values
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
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    amount VARCHAR(150) UNIQUE DEFAULT '0',
    color VARCHAR(50),
    voltage INTEGER CHECK (voltage IN (110, 220)),
    description TEXT,
    category_id INTEGER NOT NULL,
    price DECIMAL(10,2),
    CONSTRAINT fk_category
        FOREIGN KEY(category_id) 
            REFERENCES categories(id)
	);

	-- Ex: 06 - Cadastro pedido

create table orders (
	id SERIAL PRIMARY KEY,
	client_id INT not null,
	total decimal(10,2) not null,
	address text not null,
	observations text,
	FOREIGN KEY (client_id) references clients (id)
	)

create table orders_items(
	id SERIAL PRIMARY KEY,
	order_id INT not null,
	product_id INT not null,
	amount int not null,
	price decimal (10, 2) not null,
	FOREIGN KEY (order_id) references orders (id),
	FOREIGN KEY (product_id) references products (id)
	)