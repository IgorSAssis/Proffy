import bcrypt from "bcrypt";
import { Request, Response } from "express";

import database from "@database/connection";

export default class {

    async index(request: Request, response: Response) {

        const users = await database("users").select("id", "name", "surname", "avatar", "bio", "whatsapp", "email");
        return response.status(200).json(users);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;
        const [userData] = await database("users").select("name", "surname", "email", "bio", "whatsapp", "avatar").where("id", "=", id);

        if (!userData) {

            return response.status(400).send({ errorMessage: "User does not found!" });

        }

        return response.status(200).json(userData);

    }

    async create(request: Request, response: Response) {

        const {
            name,
            surname,
            email,
            password
        } = request.body;

        const [user] = await database("users").where("email", "=", email);

        if (user) {

            return response.status(400).send({ error: "E-mail already registered." });

        }

        await bcrypt.genSalt(10, async(err, salt) => {

            if (err) {

                return response.status(500).send({ errorMessage: "Something wrong happened during creating new account!" });

            }

            await bcrypt.hash(password, salt, async(err, hash) => {

                if (err) {

                    return response.status(500).send({ errorMessage: "Something wrong happened during creating new account!" });

                } else {

                    const userId = await database("users").insert({ name, surname, email, password: hash });
                    return userId ? response.status(201).send() : response.status(500).send({ errorMessage: "Registration failed!" });

                }

            });

        });

    }

    async update(request: Request, response: Response) {

        const { id } = request.params;

        const {
            name,
            surname,
            email,
            bio,
            whatsapp,
            avatar
        } = request.body;

        const result = await database("users").where("id", "=", id).update({ name, surname, email, bio, whatsapp, avatar });

        if (result === 0) {

            return response.status(400).json({ message: "User doesn't exist." }).send();

        }

        return response.status(200).send();

    }

    async selectTotalTeachers(request: Request, response: Response) {

        const total = await database("users")
            .count("users.id as total")
            .join("classes", "users.id", "=", "classes.user_id");

        const totalTeachers = total[0];
        return response.status(200).json(totalTeachers);

    }

}
