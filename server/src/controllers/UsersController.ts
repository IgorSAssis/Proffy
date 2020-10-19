import bcrypt from "bcrypt";

import { Request, Response } from "express";
import { sign } from "../jwt";

import database from "../database/connection";

export default class {

    async index(request: Request, response: Response) {

        const [hashType, hash] = request.headers.authorization?.split(" ");
        const [email, pass] = Buffer.from(hash, "base64").toString().split(':')

        const [ userProfile ] = await database("users").where("email", "=", email);

        if (userProfile === undefined) {
            return response.status(404).send()
        }

        const {
            id,
            name,
            surname,
            avatar,
            bio,
            password,
            whatsapp } = userProfile

        await bcrypt.compare(pass, password, async function (err, result) {
            if (err) {

                throw err;
            } else {

                if (result) {
                    const token = sign({ user: id })
                    return response.status(200).send({ profile: { name, surname, avatar, whatsapp, bio, email }, token })

                } else {
                    return response.status(400).send()
                }
            }
        })
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
                        const token = sign({ user: userId })
                        console.log(token);
                        return response.status(201).send({ token });
                    }
                })
            }
        })
    }
}
