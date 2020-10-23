import bcrypt from "bcrypt";
import { Request, Response } from "express";

import database from "../database/connection";

export default class {

    async index(request: Request, response: Response) {

        const users = await database("users").select("id", "name" ,"surname", "avatar", "bio", "whatsapp", "email");
        return response.status(200).json(users);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;
        const [ userData ] = await database("users").select("name", "surname", "email", "bio", "whatsapp", "avatar").where("id", "=", id);
        return response.status(200).json(userData);

    }

    async create(request: Request, response: Response) {

        const {
            name,
            surname,
            email,
            password
        } = request.body;

        const isEmailRegistered = await database("users").where("email", "=", email);

        if (isEmailRegistered.length > 0) {
            return response.status(400).send({ error: "E-mail already registered." });
        }

        await bcrypt.genSalt(10, async (err, salt) => {
            if (err) {
                throw err;
            } else {
                await bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        return response.status(405).send();
                    } else {
                        const userId = await database("users").insert({ name, surname, email, password: hash });
                        // const token = sign({ user: userId })
                        // console.log(token);
                        return response.status(201).send();
                    }
                })
            }
        })
    }
}
