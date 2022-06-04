const {
    users,
    posts
} = require("../models");

class UsersRepository {
    static async getByEmail({
        email
    }) {
        const getUser = await users.findOne({
            where: {
                email: email
            }
        });

        return getUser;
    }

    static async getByID({
        id
    }) {
        const getUser = await users.findOne({
            where: {
                id
            }
        });

        return getUser;
    }

    static async create({
        name,
        email,
        password,
        role,
        picture,
    }) {
        const createdUser = users.create({
            name,
            email,
            password,
            role,
            picture,
        });

        return createdUser;
    }

    static async deleteByID({
        id
    }) {
        const deletedUser = await users.destroy({
            where: {
                id
            }
        });

        return deletedUser;
    }

    static async getPostsById({
        id
    }) {
        const getPosts = await posts.findAll({
            where: {
                user_id: id
            }
        });

        return getPosts;
    }
}

module.exports = UsersRepository;