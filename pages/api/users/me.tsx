import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });
  res.json({
    ok: true,
    profile,
  });
}
export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotsession",
  password:
    "28347509234869823459023409823487509823478502783485203948523845293459023409512312314123123123342085237459872340958234950",
});
