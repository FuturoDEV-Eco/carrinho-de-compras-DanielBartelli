const {Router} = require('express')
const ClientController = require('../controllers/ClientController')


const clientsRoutes = new Router()

clientsRoutes.post("/", ClientController.criar)

module.exports = clientsRoutes