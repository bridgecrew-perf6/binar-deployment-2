const usersRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    JWT
} = require("../lib/const");
const { default: axios } = require("axios");
const { OAuth2Client } = require("google-auth-library");
const SALT_ROUND = 10;

class AuthService {
    static async register({
        name,
        email,
        password,
        role,
        picture
    }) {
        // Payload Validation
        if (!name) {
            return {
                status: false,
                status_code: 400,
                message: "Nama wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!picture) {
            return {
                status: false,
                status_code: 400,
                message: "Gambar wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!role) {
            return {
                status: false,
                status_code: 400,
                message: "Role wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!email) {
            return {
                status: false,
                status_code: 400,
                message: "Email wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!password) {
            return {
                status: false,
                status_code: 400,
                message: "Password wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                status_code: 400,
                message: "Password minimal 8 karakter",
                data: {
                    registered_user: null,
                },
            };
        }

        const getUserByEmail = await usersRepository.getByEmail({
            email
        });

        if (getUserByEmail) {
            return {
                status: false,
                status_code: 400,
                message: "Email sudah digunakan",
                data: {
                    registered_user: null,
                },
            };
        } else {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
            const createdUser = await usersRepository.create({
                name,
                email,
                password: hashedPassword,
                role,
                picture,
            });

            return {
                status: true,
                status_code: 201,
                message: "Berhasil mendaftarkan user",
                data: {
                    registered_user: createdUser,
                },
            };
        }
    }

    static async login({
        email,
        password
    }) {
        // Payload Validation
        if (!email) {
            return {
                status: false,
                status_code: 400,
                message: "Email wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        }

        if (!password) {
            return {
                status: false,
                status_code: 400,
                message: "Password wajib diisi",
                data: {
                    registered_user: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                status_code: 400,
                message: "Password minimal 8 karakter",
                data: {
                    registered_user: null,
                },
            };
        }

        const getUser = await usersRepository.getByEmail({
            email
        });

        if (!getUser) {
            return {
                status: false,
                status_code: 404,
                message: "Email belum terdaftar",
                data: {
                    user: null,
                },
            };
        } else {
            const isPasswordMatch = await bcrypt.compare(password, getUser.password);

            if (isPasswordMatch) {
                const token = jwt.sign({
                        id: getUser.id,
                        email: getUser.email,
                    },
                    JWT.SECRET, {
                        expiresIn: JWT.EXPIRED,
                    }
                );

                return {
                    status: true,
                    status_code: 200,
                    message: "User berhasil login",
                    data: {
                        token,
                    },
                };
            } else {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password salah",
                    data: {
                        user: null,
                    },
                };
            }
        }
    }

    static async loginGoogle({
        google_credential: googleCredential
    }) {
        try {
            const client = new OAuth2Client("155043602177-a6mj7v3iv3ptrkfq8c0cioebm157sufu.apps.googleusercontent.com");

            // Get google user credential
            const userInfo = await client.verifyIdToken({
                idToken: googleCredential,
                audience: "155043602177-a6mj7v3iv3ptrkfq8c0cioebm157sufu.apps.googleusercontent.com",
            });

            const {
                email,
                name
            } = userInfo.payload;

            const getUserByEmail = await usersRepository.getByEmail({
                email
            });

            if (!getUserByEmail) {
                await usersRepository.create({
                    name,
                    email,
                    role: "user",
                });
            }

            const token = jwt.sign({
                    id: getUserByEmail.id,
                    email: getUserByEmail.email,
                },
                JWT.SECRET, {
                    expiresIn: JWT.EXPIRED,
                }
            );

            return {
                status: true,
                status_code: 200,
                message: "User berhasil login",
                data: {
                    token,
                },
            };
        } catch (err) {
            console.log(err);
            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    registered_user: null,
                },
            };
        }
    }
}

module.exports = AuthService;