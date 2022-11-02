const { default: mongoose } = require('mongoose');
const Boards = require('../models/boards.model');

const handleCreateNewOne = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Create new board
            const doc = new Boards();
            doc.title = data.title;
            await doc.save();

            resolve({
                errCode: 0,
                message: 'Ok',
                data: doc,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleUpdateOne = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Update board ( { new: true } => return data after update )
            const doc = await Boards.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(id) },
                { ...data },
                { new: true }
            ).exec();

            // return { errCode: 1 } when board not exist 
            if (!doc) {
                return resolve({
                    errCode: 1,
                    message: 'Board is not exist !',
                });
            }

            resolve({
                errCode: 0,
                message: 'Ok',
                data: doc,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const handleGetBoardById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get board - columns - cards has populate with board
            const data = await Boards.findOne({
                _id: new mongoose.Types.ObjectId(id),
            })
                .populate({
                    path: 'columns',
                    match: { _destroy: false },
                    populate: {
                        path: 'cards',
                        match: { _destroy: false }
                    },
                })
                .exec();
                
            resolve({
                errCode: 0,
                message: 'Ok',
                data: data || [],
            });
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = { handleCreateNewOne, handleUpdateOne, handleGetBoardById };
