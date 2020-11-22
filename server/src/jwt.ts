import jwt from "jsonwebtoken";
import { secret } from "./config/jtw.json";

export const sign = (payload: Object) => jwt.sign(payload, secret);
export const verify = (token: string) => jwt.verify(token, secret);
