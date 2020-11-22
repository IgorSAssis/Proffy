import { Request, Response, NextFunction } from "express";

export const isAuthenticated = async(request: Request, response: Response, next: NextFunction) => {

    const credentials = request.headers.authorization?.split(" ");

    try {

        if (!credentials) {

            return response.status(400).send({ errorMessage: "Invalid credentials." });
        
        }

    } catch (err) {

        return response.send(err);
    
    }

};
