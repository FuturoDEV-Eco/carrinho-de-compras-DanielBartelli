const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',        
    port: 3000,
    user: 'postgres',     
    password: '37334355',     
    database: 'api_carrinho_de_compras'
})

class ProductController{

    async criar(request, response) {
        try {
            const dados = request.query

            if (!dados.name || !dados.category_id) {

                return response.status(400).json({
                    mensagem: 'Preencha todos os campos!'
                })
            }

            const produto = await conexao.query(`
                INSERT into products
                    (name, amount, color, voltage, description, category_id, price)
                    values
                    ($1, $2, $3, $4, $5, $6, $7)
                    returning *
                `, [dados.name, dados.amount, dados.color, dados.voltage, dados.description, dados.category_id, dados.price])

            response.status(201).json(produto.rows[0])
        } catch (error) {
            response.status(500).json({ mensagem: 'Erro ao cadastrar o produto!'})
        }
    }

    //Listador de Produtos
    async listarTodos(request, response) {
        try {
            const produtos = await conexao.query("select * from products")
            response.json(produtos.rows)
        } catch (error) {
            response.status(500).json({ mensagem: 'Não possivel listar os produtos' })
        }
    }

    //Listador de detalhes dos Produtos
    async listarProduto(request, response) {
        try {
            const id = request.params.id
            const produto = await conexao.query(`
                
                SELECT p.name, p.amount, p.color, p.voltage, p.description, c.name AS category_name
                FROM products p
                INNER JOIN categories c ON p.category_id = c.id 
                WHERE p.id = ${id}`)
                
            if (produto.rows.length > 0) {
                response.status(200).json(produto.rows[0])
            }else {
                response.status(404).json({ mensagem: 'Produto não encontrado' })
            }
        } catch (error) {
            response.status(500).json({ mensagem: "Erro ao carregar o produto" })
        }
    }
}



module.exports = new ProductController()