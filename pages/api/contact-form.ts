import { NextApiResponse, NextApiRequest } from "next";
import ResponseData from "../../interfaces/ResponseData";
import nodemailer, { SendMailOptions } from "nodemailer";

const handleSendContactEmail = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req) {
    try {
      const email: string = req.body.email;
      const message: string = req.body.message;

      const msgHtmlArr: string[] = message.trim().split("\n");
      const msgHtmlContent: string = msgHtmlArr
        .map((p) => `<p>${p}</p><br/>`)
        .join("")
        .trim();

      const transporter = nodemailer.createTransport({
        service: "Outlook",
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: process.env.ARNOLIO_USER,
          pass: process.env.ARNOLIO_PASS,
        },
        // secure: true,
      });

      const nodemailerOptions: SendMailOptions = {
        from: process.env.ARNOLIO_USER,
        to: process.env.TO_EMAIL,
        subject: `Arnolio - From ${email}`,
        // text: message,
        html: msgHtmlContent,
      };

      await transporter.sendMail(nodemailerOptions, (mailErr, mailResInfo) => {
        if (mailErr) {
          console.log(mailErr);
          throw Error;
        }
        res.status(200).send({
          status: 200,
          data: {
            response: mailResInfo,
            from: email,
            to: process.env.TO_EMAIL,
          },
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export default handleSendContactEmail;
