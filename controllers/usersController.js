const usersService = require("../services/usersService")

const getPostsById = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        status,
        status_code,
        message,
        data
    } =
    await usersService.getPostsById({
        id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const deleteByID = async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        status,
        status_code,
        message,
        data
    } = await usersService.deleteByID({
        id,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

module.exports = {
    getPostsById,
    deleteByID
};