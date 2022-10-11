import twilio from "twilio";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { error } from "console";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const mailTransporter = nodemailer.createTransport({
  service: "Naver",
  host: "smtp.naver.com",
  port: 587,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.MAISSPASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone: phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(Math.random() * 90000 + 100000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    /*  const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.PHONE!,
      body: `Your login token is ${payload}`,
    }); */
  }
  if (email) {
    /*   const mailOptions = {
      from: process.env.USEREMAIL,
      to: email,
      subject: "Carrot Market Authentication Email",
      text: `Your login token is ${payload}`,
    };
    const message = await mailTransporter.sendMail(
      mailOptions,
      (error, response) => {
        if (error) {
          console.log(error);
          return null;
        } else {
          console.log(response);
          return null;
        }
      }
    );
    mailTransporter.close();
    console.log(message); */
  }
  return res.json({
    ok: true,
  });
}
export default withHandler({ methods: ["POST"], handler, isPrivate: false });
