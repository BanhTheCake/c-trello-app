const { default: mongoose } = require('mongoose');
const Cards = require('../models/cards.model');
const Columns = require('../models/columns.model');

const handleCreateNewOne = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Create new card
            const doc = new Cards();
            doc.title = data.title;
            doc.boardId = mongoose.Types.ObjectId(data.boardId);
            doc.columnId = mongoose.Types.ObjectId(data.columnId);
            await doc.save();

            // Update column columns's cardOrder
            await Columns.findOneAndUpdate(
                { _id: doc.columnId },
                { $push: { cardOrder: doc._id.toString(), cards: doc._id } }
            ).exec();

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
            // Update card ( { new: true } => return data after update )
            if (data.boardId) {
                data.boardId = mongoose.Types.ObjectId(data.boardId);
            }
            if (data.columnId) {
                data.columnId = mongoose.Types.ObjectId(data.columnId);
            }
            const doc = await Cards.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(id) },
                { ...data },
                { new: true }
            ).exec();

            // return { errCode: 1 } when card not exist
            if (!doc) {
                return resolve({
                    errCode: 1,
                    message: 'Card is not exist !',
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
module.exports = { handleCreateNewOne, handleUpdateOne };
