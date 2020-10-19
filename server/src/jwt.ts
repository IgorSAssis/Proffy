import jwt from "jsonwebtoken";

const secret = "mySecret";

export const sign = (payload: Object) => jwt.sign(payload, secret);
export const verify = (token: string) => jwt.verify(token, secret);