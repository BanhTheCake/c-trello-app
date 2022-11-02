const express = require('express');
const route = express.Router();

const columnsValidation = require('../../validation/columns.validation');
const columnsController = require('../../controllers/columns.controller');

route.post(
    '/createNewOne',
    columnsValidation.createNewOne,
    columnsController.createNewOne
);
route.put(
    '/updateOne/:id',
    columnsValidation.updateOne,
    columnsController.updateOne
);

module.exports = route;
