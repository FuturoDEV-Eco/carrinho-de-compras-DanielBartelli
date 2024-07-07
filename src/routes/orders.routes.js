const {Router} = require('express')
const OrderController = require('../controllers/OrderController')

const ordersRoutes = new Router()

ordersRoutes.post('/pedido', OrderController.cart)

module.exports = ordersRoutes