
const { Pool } = require('pg');

const conexao = new Pool({
    user: 'postgres',     
    host: 'localhost',        
    database: 'api_carrinho_de_compras',  
    password: '37334355',     
    port: 3000,
})

class ClientController{
    async criar(request, response) {
        try {
            
        } catch (error) {
            
        }
    }
}


module.exports = new ClientController()
