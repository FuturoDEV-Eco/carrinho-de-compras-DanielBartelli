const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',        
    port: 5432,
    user: 'postgres',     
    password: '37334355',     
    database: 'api_carrinho_de_compras'
})


class OrderController{

    async cart(request,response) {
        try {
            const dados = request.body
            let total = 0;

            for (let i = 0; i < dados.products.length; i++) {
                const items = dados.products[i];
                const produto = await conexao.query(`
                    SELECT price FROM products 
                    WHERE id = $1
                `, [items.product_id]);
    
                total = total + (produto.rows[0].price * items.amount);
            }
    
            // inserir pedido 
        const pedido = await conexao.query(`
            INSERT INTO orders (
            client_id,
            address,
            observations,
            total
            )
            values (
            $1,
            $2,
            $3,
            $4
            )`, [dados.client_id, dados.address, dados.observations, total])
    
        dados.products.forEach(async item => {
            const produto = await conexao.query(`
                SELECT price from products 
                where id = $1
                `, [item.product_id])
    
            conexao.query(`
                INSERT INTO orders_items (
                order_id,
                product_id,
                amount,
                price
                )

                values (
                $1,
                $2,
                $3,
                $4
                )`, [pedido.rows[0].id, item.product_id, item.amount, produto.rows[0].price])
            })
            response.status(201).json()
        } catch (error) {
            response.status(500).json({ mensagem: 'Erro ao montar o carrinho'})
        }
    }

}

module.exports = new OrderController()