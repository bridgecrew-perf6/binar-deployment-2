const postsRepository = require("../postsRepository");

describe("create post", () => {
    it("should create post to db", async () => {
        const postToCreate = {
            user_id: 1,
            title: "Judul Post Baru Banget ya",
            description: "Deskripsi Post Baru Banget",
            picture: "image-123123.png"
        };

        const createdPost = await postsRepository.create(postToCreate);

        // Assertion
        expect(createdPost.user_id).toEqual(postToCreate.user_id);
        expect(createdPost.title).toEqual(postToCreate.title);
        expect(createdPost.description).toEqual(postToCreate.description);

        // Delete Test Data
        await postsRepository.deleteById({
            id: createdPost.id
        });
    });
});

// describe("update post", () => {
//     it("should update post to db", async () => {
//         const postToCreate = {
//             user_id: 1,
//             title: "Judul Post Baru Banget ya bro",
//             description: "Deskripsi Post Baru Banget",
//             picture: "image-123123.png"
//         };

//         const postToUpdate = {
//             user_id: 1,
//             title: "Judul Post Baru Banget ya ni",
//             description: "Deskripsi Post Baru Banget",
//             picture: "image-123123.png"
//         }

//         const createdPost = await postsRepository.create(postToCreate);

//         // const getPostById = await postsRepository.getById({
//         //     id: createdPost.id
//         // })

//         const updatePost = await postsRepository.updateById({
//             id: createdPost.id
//         }, postToUpdate)


//         // // Assertion
//         expect(createdPost.user_id).toEqual(updatePost.user_id);
//         expect(createdPost.title).toEqual(updatePost.title);
//         expect(createdPost.description).toEqual(updatePost.description);

//         // Delete Test Data
//         // await postsRepository.deleteById({
//         //     id: createdPost.id
//         // });
//     });
// });

describe("get post by id", () => {
    it("should get post to db", async () => {
        // Create Data
        const postToCreate = {
            user_id: 1,
            title: "Judul Post Baru Banget yow",
            description: "Deskripsi Post Baru Banget",
        };

        const createdPost = await postsRepository.create(postToCreate);

        const post = await postsRepository.getById({
            id: createdPost.id
        });

        expect(post.user_id).toEqual(createdPost.user_id);
        expect(post.title).toEqual(createdPost.title);
        expect(post.description).toEqual(createdPost.description);

        // Delete Test Data
        await postsRepository.deleteById({
            id: createdPost.id
        });
    });
});

describe("get all post", () => {
    it("should get all post to db", async () => {
        // Create Data
        const postToCreate = {
            user_id: 1,
            title: "Judul Post Baru Banget ni",
            description: "Deskripsi Post Baru Banget",
        };

        const createdPost = await postsRepository.create(postToCreate);

        await postsRepository.getAll();

        // expect(getPost.user_id).toEqual(createdPost.user_id);
        // expect(getPost.title).toEqual(createdPost.title);
        // expect(getPost.description).toEqual(createdPost.description);

        // Delete Test Data
        await postsRepository.deleteById({
            id: createdPost.id
        });
    });
});

describe("delete post by id", () => {
    it("should delete post to db", async () => {
        // Create Data
        const postToCreate = {
            id: 1,
            title: "Judul Post Baru Banget ges",
            description: "Deskripsi Post Baru Banget",
        };

        const deletedPosts = await postsRepository.create(postToCreate);

        // Delete Test Data
        await postsRepository.deleteById({
            id: deletedPosts.id
        });

        // expect(post.user_id).toEqual(deletedPosts.user_id);
        // expect(post.title).toEqual(deletedPosts.title);
        // expect(post.description).toEqual(deletedPosts.description);
    });
});