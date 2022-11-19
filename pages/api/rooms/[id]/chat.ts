import withHandler, { IResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    body: { chat },
    query: { id },
    session: { user },
  } = req;
  const createChat = await client.chat.create({
    data: {
      chat,
      user: {
        connect: {
          id: user?.id,
        },
      },
      room: {
        connect: {
          id: +id!,
        },
      },
    },
  });
  res.json({
    ok: true,
    chat: createChat,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
