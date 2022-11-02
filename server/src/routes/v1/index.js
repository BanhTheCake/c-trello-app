const express = require('express')
const route = express.Router()

const boardsRoute = require('./boards.route')
const columnsRoute = require('./columns.route')
const cardsRoute = require('./cards.route')

// Boards Route
route.use('/boards', boardsRoute)

// Columns Route
route.use('/columns', columnsRoute)

// Cards Route
route.use('/cards', cardsRoute)

module.exports = route