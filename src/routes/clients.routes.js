const {Router} = require('express')
const ClientController = require('../controllers/ClientController')

const clientsRoutes = new Router()

clientsRoutes.post("/cadastro", ClientController.criar)

module.exports = clientsRoutes