import nodemailer from "nodemailer";

type TMailerOptions = {
  to: string,
  subject: string,
  message: string
}

export const mailer = async (options: TMailerOptions) => {

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 0,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} ${process.env.FROM_EMAIL}` || "",
    to: options.to || "",
    subject: options.subject || "",
    text: options.message || ""
  };

  await transporter.sendMail(message)
}