import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    body: { question, latitude, longitude },
    session: { user },
  } = req;
  if (req.method === "POST") {
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wonderings: true,
            answers: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      posts,
    });
  }
}
export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);