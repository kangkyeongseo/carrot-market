import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    body: { answer },
    query: { id },
    session: { user },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: +id!.toString(),
    },
    select: {
      id: true,
    },
  });
  if (!post) {
    res.status(404).end();
  }
  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id!.toString(),
        },
      },
      answer,
    },
  });
  res.json({
    ok: true,
    answer: newAnswer,
  });
}
export default withApiSession(withHandler({ methods: ["POST"], handler }));
