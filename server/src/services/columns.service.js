const { default: mongoose } = require('mongoose');
const Columns = require('../models/columns.model');
const Boards = require('../models/boards.model');
const Cards = require('../models/cards.model');

const handleCreateNewOne = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Create new column
            const doc = new Columns();
            doc.title = data.title;
            doc.boardId = mongoose.Types.ObjectId(data.boardId);
            await doc.save();

            // Update column boards's columnOrder
            await Boards.findOneAndUpdate(
                { _id: doc.boardId },
                { $push: { columnOrder: doc._id.toString(), columns: doc._id } }
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
            // update column by id ( { new: true } => return data after update )
            if (data.boardId) {
                data.boardId = mongoose.Types.ObjectId(data.boardId)
            }

            if (data.cards) {
                data.cards = data.cards.map(card => mongoose.Types.ObjectId(card._id))
            }

            if (data.cardAddTo) {
                data.cardAddTo = mongoose.Types.ObjectId(data.cardAddTo)
                await Cards.findOneAndUpdate({ _id: data.cardAddTo }, 
                    { columnId: mongoose.Types.ObjectId(id)}
                )
                delete data.cardAddTo
            }

            const doc = await Columns.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(id) },
                { ...data },
                { new: true }
            ).exec();

            // delete all card in column
            if (data._destroy) {
                await Cards.updateMany({ columnId: new mongoose.Types.ObjectId(id) }, { _destroy: true })
            }

            // return { errCode: 1 } when column not exist 
            if (!doc) {
                return resolve({
                    errCode: 1,
                    message: 'Column is not exist !',
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
