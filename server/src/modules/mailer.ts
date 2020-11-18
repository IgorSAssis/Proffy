import nodemailer from "nodemailer";

import { host, port, user, pass } from "../config/mail.json";

const transporter = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

export default transporter;