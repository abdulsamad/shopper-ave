import nodemailer from 'nodemailer';

interface IMailHelper {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const mailerHelper = async ({ to, subject, text, html }: IMailHelper) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `"shopperave@contact.com <shopperave@store.com`,
    to,
    subject,
    text,
    html,
  };

  // Send email with defined transport
  const send = await transporter.sendMail(message);

  return send;
};
