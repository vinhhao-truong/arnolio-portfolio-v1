import { NextApiResponse, NextApiRequest } from "next";
import ResponseData from "../../interfaces/ResponseData";
// import nodemailer, { SendMailOptions } from "nodemailer";
import mailjet from "node-mailjet";

const handleSendContactEmail = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req) {
    // try {
    //   const email: string = req.body.email;
    //   const message: string = req.body.message;

    //   const msgHtmlArr: string[] = message.trim().split("\n");
    //   const msgHtmlContent: string = msgHtmlArr
    //     .map((p) => `<p>${p}</p><br/>`)
    //     .join("")
    //     .trim();

    //   const transporter = nodemailer.createTransport({
    //     service: "Outlook",
    //     host: "smtp.office365.com",
    //     port: 587,
    //     auth: {
    //       user: process.env.ARNOLIO_USER,
    //       pass: process.env.ARNOLIO_PASS,
    //     },
    //     // secure: true,
    //   });

    //   const nodemailerOptions: SendMailOptions = {
    //     from: process.env.ARNOLIO_USER,
    //     to: process.env.TO_EMAIL,
    //     subject: `Arnolio - From ${email}`,
    //     // text: message,
    //     html: msgHtmlContent,
    //   };

    //   await transporter.sendMail(nodemailerOptions, (mailErr, mailResInfo) => {
    //     if (mailErr) {
    //       console.log(mailErr);
    //       throw Error;
    //     }
    //     res.status(200).send({
    //       status: 200,
    //       data: {
    //         response: mailResInfo,
    //         from: email,
    //         to: process.env.TO_EMAIL,
    //       },
    //     });
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    try {
      const mailJetApi = mailjet.apiConnect(
        //@ts-ignore
        process.env.MAILJET_API_KEY,
        process.env.MAILJET_SECRET_KEY
      );

      const email: string = req.body.email;

      const sendMailJet = await mailJetApi
        .post("send", { version: "v3.1" })
        .request({
          Messages: [
            {
              From: {
                Email: process.env.ARNOLIO_EMAIL,
                Name: "Arnolio",
              },
              To: [
                {
                  Email: process.env.PERSONAL_EMAIL,
                },
              ],
              Subject: `Request from Arnolio by ${email}`,
              TextPart: req.body.message,
              HTMLPart: `<div>${req.body.message}</div>`,
            },
          ],
        });
      // console.log(sendMailJet.body);
      res.status(200).send({
        status: 200,
        data: {
          response: sendMailJet.body,
          from: email,
          to: process.env.PERSONAL_EMAIL,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(404).send({
        status: 404,
        data: {
          response: "Email failed",
        },
      });
    }
  }
};

export default handleSendContactEmail;
