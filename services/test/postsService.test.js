const postService = require("../postsService");

describe("create post", () => {
    it("should create post to db", async () => {
        // Create payload
        const postToCreate = {
            user_id: 1,
            title: "Judul Post Baru Banget",
            description: "Deskripsi Post Baru Banget",
        };

        // Expected Response
        const expectedCreatedPost = {
            id: 999,
            user_id: 1,
            title: "Judul Post Baru Banget",
            description: "Deskripsi Post Baru Banget",
        };

        const expectedCreatedPostService = {
            status: true,
            status_code: 201,
            message: "Post created successfully",
            data: {
                created_posts: expectedCreatedPost,
            },
        };

        // Create service mock function
        const mockPostService = postService;

        mockPostService.create = jest
            .fn()
            .mockImplementation(() => Promise.resolve(expectedCreatedPostService));
        const createdPostResponse = await mockPostService.create(postToCreate);

        // Assertion
        expect(expectedCreatedPostService.status).toEqual(
            createdPostResponse.status
        );
        expect(expectedCreatedPostService.status_code).toEqual(
            createdPostResponse.status_code
        );
        expect(expectedCreatedPostService.message).toEqual(
            createdPostResponse.message
        );
        expect(expectedCreatedPostService.data.created_posts).toEqual(
            createdPostResponse.data.created_posts
        );
    });
});

describe("delete post", () => {
    it("should delete post to db", async () => {
        // Create payload
        const postToCreate = {
            user_id: 1,
            title: "Judul Post Baru Banget",
            description: "Deskripsi Post Baru Banget",
        };

        // Expected Response
        const expectedCreatedPost = {
            id: 999,
            user_id: 1,
            title: "Judul Post Baru Banget ya",
            description: "Deskripsi Post Baru Banget",
        };

        const expectedCreatedPostService = {
            status: true,
            status_code: 200,
            message: "Post deleted successfully",
            data: {
                deleted_post: expectedCreatedPost,
            },
        };

        // Create service mock function
        const mockPostService = postService;

        mockPostService.create = jest
            .fn()
            .mockImplementation(() => Promise.resolve(expectedCreatedPostService));
            
        const createdPostResponse = await mockPostService.create(postToCreate);
        const GetPostResponse = await mockPostService.getById({id: createdPostResponse.id})
        const deletedPostResponse = await mockPostService.deleteById(GetPostResponse);

        // Assertion
        expect(expectedCreatedPostService.status).toEqual(
            deletedPostResponse.status
        );
        expect(expectedCreatedPostService.status_code).toEqual(
            deletedPostResponse.status_code
        );
        expect(expectedCreatedPostService.message).toEqual(
            deletedPostResponse.message
        );
        expect(expectedCreatedPostService.data.deleted_post).toEqual(
            deletedPostResponse.data.deleted_post
        );
    });
});