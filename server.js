const express = require("express");
const app = express();
const PORT = 8087;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const upload = require("./utils/fileUpload")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Import Controllers
const authController = require("./controllers/authController");
const postsController = require("./controllers/postsController");
const usersController = require("./controllers/usersController");

// import middlewares
const middlewares = require("./middlewares/auth");

// Define Routes auth
// app.post("/auth/register", authController.register);
app.post("/auth/register", upload.single("picture"), authController.register);
app.post("/auth/login", authController.login);
app.post("/auth/login-google", authController.loginGoogle);
app.get("/auth/me", middlewares.authenticate, authController.currentUser);

// define routes posts
app.post("/posts", middlewares.authenticate, upload.single("picture"),  postsController.create);
app.delete("/posts/:id", middlewares.authenticate, postsController.deleteById);
app.put("/posts/:id", middlewares.authenticate, upload.single("picture"), postsController.updateById);

app.get("/api/posts", postsController.getAll);
app.get('/api/posts/:id', postsController.getById);
app.get("/users/:id/posts", usersController.getPostsById);
app.delete("/users/:id", middlewares.authenticate,middlewares.isAdmin, postsController.deleteById);

app.use("/public/files", express.static(path.join(__dirname, "/storages")));

app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${PORT}`);
});