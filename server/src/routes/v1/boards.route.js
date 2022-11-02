const express = require('express');
const route = express.Router();

const boardsValidation = require('../../validation/boards.validation');
const boardsController = require('../../controllers/boards.controller');

route.post(
    '/createNewOne',
    boardsValidation.createNewOne,
    boardsController.createNewOne
);
route.put(
    '/updateOne/:id',
    boardsValidation.updateOne,
    boardsController.updateOne
);
route.get('/getBoardById/:id', boardsController.getBoardById);

module.exports = route;
