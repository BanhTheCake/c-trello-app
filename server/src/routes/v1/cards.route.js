const express = require('express');
const route = express.Router();

const cardsValidation = require('../../validation/cards.validation');
const cardsController = require('../../controllers/cards.controller');

route.post(
    '/createNewOne',
    cardsValidation.createNewOne,
    cardsController.createNewOne
);
route.put(
    '/updateOne/:id',
    cardsValidation.updateOne,
    cardsController.updateOne
);

module.exports = route;
