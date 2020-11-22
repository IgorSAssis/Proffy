import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";

import database from "@database/connection";
import { sign } from "../jwt";
import mailer from "../modules/mailer";

export default class {

    async signIn(request: Request, response: Response) {

        const credentials = request.headers.authorization?.split(" ");

        if (!credentials) {

            return response.status(400).json({ errorMessage: "Inválid credentials." });

        }

        const [email, pass] = Buffer.from(credentials[1], "base64").toString().split(":");
        const [userProfile] = await database("users").where("email", "=", email);

        if (userProfile === undefined) {

            return response.status(400).send({ message: "User does not found!" });

        }

        const { id, password } = userProfile;

        await bcrypt.compare(pass, password, async function(err, result) {

            if (err) {

                return response.status(500).send();

            }

            if (result) {

                const token = sign({ user: id });
                return response.status(200).send({ token, userId: id });

            } else {

                return response.status(400).send({ errorMessage: "E-mail or password is incorrect." });

            }

        });

    }

    async forgotPassword(request: Request, response: Response) {

        try {

            const { email } = request.body;
            const [user] = await database("users").select("id").where("email", "=", email);

            if (!user) {

                return response.status(400).send({ error: "User does not found!" });

            }

            const token = crypto.randomBytes(20).toString("hex");
            const now = new Date();
            now.setMinutes(now.getMinutes() + 20);

            await database("users").where("id", "=", user.id).update({

                passwordResetToken: token,
                passwordResetExpires: now

            });

            mailer.sendMail({

                from: "igorsemphoski@gmail.com",
                to: "igorsemphoski@gmail.com",
                subject: "Recuperação de senha.",
                text: "Plaintext version of the message",
                html: `<h1>Parece que você esqueceu a sua senha.</h1>
                       <p>Utilize o token abaixo para alterar a sua senha:</p>
                       <p>${token}</p>`

            }, (err) => {

                if (err) {

                    return response.status(500).send({ errorMessage: "Something wrong happened during send email!" });

                }
                return response.status(200).send();

            });

        } catch (error) {

            return response.status(500).send();

        }

    }

    async resetPassword(request: Request, response: Response) {

        const { email, token, password } = request.body;

        try {

            const [user] = await database("users").select("id", "passwordResetToken", "passwordResetExpires").where("email", "=", email);
            const now = new Date();

            if (!user) {

                return response.status(400).send({ errorMessage: "User does not found!" });

            }

            if (token !== user.passwordResetToken) {

                return response.status(400).send({ errorMessage: "Token invalid." });

            }

            if (now > user.passwordResetExpires) {

                return response.status(400).send({ errorMessage: "Token expired. Generate a new token." });

            }

            await bcrypt.genSalt(10, async(err, salt) => {

                if (err) {

                    return response.status(500).send({ errorMessage: "Something wrong happened during reseting account!" });

                } else {

                    await bcrypt.hash(password, salt, async(err, hash) => {

                        if (err) {

                            return response.status(500).send();

                        } else {

                            await database("users").update({ password: hash }).where("id", "=", user.id);
                            return response.status(200).send();

                        }

                    });

                }

            });

        } catch (error) {

            return response.status(500).send({ errorMessage: "Something wrong happened during reset password process!" });

        }

    }

}
