import { Request, Response, NextFunction } from "express";
import { verify } from "../jwt"
import database from "../database/connection";


export const isAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
    const [, token ] = request.headers.authorization?.split(" ")
    try {
        const payload = await verify(token)
        console.log(payload)

    } catch(err) {
        return response.send(err)
    }
}