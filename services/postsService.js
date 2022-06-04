const postsRepository = require("../repositories/postsRepository");

class postsService {
    static async create({
        user_id,
        title,
        description,
        picture,
    }) {
        if (!title) {
            return {
                status: false,
                status_code: 400,
                message: "title wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!picture) {
            return {
                status: false,
                status_code: 400,
                message: "picture wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!description) {
            return {
                status: false,
                status_code: 400,
                message: "description wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }
        const createdPosts = await postsRepository.create({
            user_id,
            title,
            description,
            picture,
        });

        return {
            status: true,
            status_code: 201,
            message: "created posts successfully",
            data: {
                created_posts: createdPosts,
            },
        };
    }

    static async deleteById({
        user_id,
        id,
    }) {
        const getPosts = await postsRepository.getById({
            id
        });

        if (getPosts.user_id == user_id) {
            const deletedPost = await postsRepository.deleteById({
                id,
            });

            return {
                status: true,
                status_code: 200,
                message: "Post deleted successfully",
                data: {
                    deleted_post: deletedPost,
                },
            };
        } else {
            return {
                status: true,
                status_code: 401,
                message: "Resource Unauthorized",
                data: {
                    deleted_post: null,
                },
            };
        }
    }

    static async getById({
        id,
    }) {
        const getById = await postsRepository.getById({
            id,
        });
        return {
            status: true,
            status_code: 200,
            message: "success get data",
            data: {
                getdata: getById,
            },
        };
    }

    static async getAll() {
        const getAll = await postsRepository.getAll();

        return {
            status: true,
            status_code: 200,
            message: "Posts successfully loaded",
            data: {
                getDataAll: getAll,
            },
        };
    }

        static async updateById({
            id,
            user_id,
            title,
            description,
            picture,
        }) {
            const getPost = await postsRepository.getById({
                id
            });

            if (getPost.user_id == user_id) {
                const updatedPost = await postsRepository.updateById({
                    id,
                    title,
                    description,
                    picture,
                });

                return {
                    status: true,
                    status_code: 200,
                    message: "Post updated successfully",
                    data: {
                        updated_post: updatedPost,
                    },
                };
            } else {
                return {
                    status: true,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        updated_post: null,
                    },
                };
            }
        }
    }

    module.exports = postsService;