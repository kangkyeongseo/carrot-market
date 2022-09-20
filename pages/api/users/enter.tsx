import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);

  return res.json({ ok: true });
}
export default withHandler("POST", handler);
