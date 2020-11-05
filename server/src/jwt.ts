import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
// const SECRET = process.env.ACCESS_SECRET_TOKEN;
const SECRET = "MySecret";

export const sign = (payload: Object) => jwt.sign(payload, SECRET);
export const verify = (token: string) => jwt.verify(token, SECRET);