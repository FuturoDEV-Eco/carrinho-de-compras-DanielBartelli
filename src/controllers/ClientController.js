
const { Pool } = require('pg');

const conexao = new Pool({
    user: 'postgres',     
    host: 'localhost',        
    database: 'api_carrinho_de_compras',  
    password: '37334355',     
    port: 3001,
})

class ClientController{

    async criar(request, response) {
        try {

            const dados = request.body;

            if (!dados.name || !dados.email || !dados.cpf || !dados.contact) {

                return response.status(400).json({
                    mensagem: 'Preencha todos os dados!'
                })
            }

            const servico = await conexao.query(`
                INSERT INTO clients
                (name, email, cpf, contact)
                values
                ($1, $2, $3, $4)
                returning *
                `, [dados.nome, dados.email, dados.cpf, dados.contact]);

                response.status(201).json(servico.rows[0]);

            } catch (error) {
                response.status(500).json({ mensagem: 'Não foi possivel cadastrar'});
        }
    }
}


module.exports = new ClientController();
