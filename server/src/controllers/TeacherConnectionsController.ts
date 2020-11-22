import { Request, Response } from "express";
import database from "@database/connection";

export default class {

    async index(request: Request, response: Response) {

        const total = await database("users")
            .count("users.id as total")
            .join("classes", "users.id", "=", "classes.user_id");

        const totalTeachers = total[0];
        return response.status(200).json(totalTeachers);

    }

}
