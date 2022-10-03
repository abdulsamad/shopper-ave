import nodemailer from 'nodemailer';

interface IMailHelper {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

/**
 * Sends email via Nodemailer
 * @param {to, subject, text. html}
 * @returns {SMTPTransport.SentMessageInfo}
 */
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
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    text,
    html,
  };

  // Send email with defined transport
  const send = await transporter.sendMail(message);

  return send;
};
