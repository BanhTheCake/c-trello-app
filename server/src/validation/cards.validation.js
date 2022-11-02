const yup = require('yup');

const schema = {
    createNewOne: yup.object().shape({
        columnId: yup
            .string('ColumnId must be string')
            .required('ColumnId must be required'),
        boardId: yup
            .string('BoardId must be string')
            .required('BoardId must be required'),
        title: yup
            .string('Title must be string !')
            .required('Title must be required !')
            .min(5, 'Title must has more 5 character !')
            .max(65, 'Title can not over 65 character !'),
    }),
    updateOne: yup.object().shape({
        id: yup.string('Id must be string').required('Id must be required'),
        columnId: yup
            .string('ColumnId must be string'),
        title: yup
            .string('Title must be string !')
            .min(5, 'Title must has more 5 character !')
            .max(65, 'Title can not over 65 character !'),
    }),
};

const createNewOne = async (req, res, next) => {
    try {
        await schema.createNewOne.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const err = {};
        error.inner.forEach((e) => {
            err[e.path] = e.message;
        });
        return res.status(400).json({
            errCode: -1,
            message: err,
        });
    }
};

const updateOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await schema.updateOne.validate({ id, ...data }, { abortEarly: false });
        next();
    } catch (error) {
        const err = {};
        error.inner.forEach((e) => {
            err[e.path] = e.message;
        });
        return res.status(400).json({
            errCode: -1,
            message: err,
        });
    }
};

module.exports = { createNewOne, updateOne };
