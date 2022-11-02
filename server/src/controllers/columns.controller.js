const columnsService = require('../services/columns.service');

const createNewOne = async (req, res) => {
    try {
        const data = await columnsService.handleCreateNewOne(req.body);
        return res.status(200).json(data);
    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).send({
                errCode: -1,
                message: errors
            });
        }
        console.log(error);
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !',
        });
    }
};

const updateOne = async (req, res) => {
    try {
        const { id } = req.params
        const data = await columnsService.handleUpdateOne(id, req.body);
        return res.status(200).json(data);
    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).send({
                errCode: -1,
                message: errors
            });
        }
        return res.status(500).json({
            errCode: -2,
            message: 'Something wrong with server !',
        });
    }
}

module.exports = { createNewOne, updateOne };
