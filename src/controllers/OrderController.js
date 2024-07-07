const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',        
    port: 3000,
    user: 'postgres',     
    password: '37334355',     
    database: 'api_carrinho_de_compras'
})


class OrderController {
    async cart(request,response) {
        try {
            const dados = request.body
        } catch (error) {
            response.status(500).json()
        }
    }
}
module.exports = new OrderController();