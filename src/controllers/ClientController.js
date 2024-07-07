const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',        
    port: 3000,
    user: 'postgres',     
    password: '37334355',     
    database: 'api_carrinho_de_compras'
})

class ClientController {
    async criar(request, response) {
        try {
            const dados = request.body;

            if (!dados.name || !dados.email || !dados.cpf || !dados.contact) {
                return response.status(400).json({
                    mensagem: 'Preencha todos os dados!'
                });
            }

            await conexao.query(`
                INSERT into clients (
                name,
                email,
                cpf,
                contact
                )
                VALUES (
                $1,
                $2,$3,
                $4
                )
            `, [dados.name, dados.email, dados.cpf, dados.contact])

            response.status(201).json()

        } catch (error) {
            console.error(error);
            response.status(500).json({ mensagem: 'Erro ao cadastrar o Cliente' })
        }
    }
}

module.exports = new ClientController();
