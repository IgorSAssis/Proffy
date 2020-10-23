import { Request, Response } from "express";
import bcrypt from "bcrypt";

import database from "../database/connection";
import { sign } from "../jwt";

interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    bio: string;
    whatsapp:string;
    avatar: string;
}

export default class {

    async index(request: Request, response: Response) {

        const [hashType, hash] = request.headers.authorization?.split(" ");
        const [email, pass] = Buffer.from(hash, "base64").toString().split(':')
        const [ userProfile ] = await database("users").where("email", "=", email);

        if (userProfile === undefined) {
            return response.status(404).send({ message: "User doesn't exists." })
        }

        const {
            id,
            name,
            surname,
            bio,
            whatsapp,
            avatar,
            password } = userProfile;

        await bcrypt.compare(pass, password, async function (err, result) {
            if (err) {

                throw err;
            } else {

                if (result) {
                    const token = sign({ user: id })
                    return response.status(200).send({ token, userId: id })

                } else {
                    return response.status(400).send()
                }
            }
        })
    }
}