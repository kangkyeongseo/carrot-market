import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { token } = req.body;
  console.log(token);
  res.status(200).end();
}
export default withHandler("POST", handler);
