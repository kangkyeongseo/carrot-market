import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    query: { id },
    body: { review, starCount },
    session: { user },
  } = req;

  const room = await client.room.findFirst({
    where: {
      id: +id!,
    },
    include: {
      review: {
        select: {
          id: true,
        },
      },
    },
  });

  const existReview = await client.review.findFirst({
    where: {
      roomId: room?.id,
    },
  });

  if (existReview) {
    await client.review.update({
      where: {
        id: existReview.id,
      },
      data: {
        review,
        score: starCount,
      },
    });
  } else {
    await client.review.create({
      data: {
        review,
        score: starCount,
        room: {
          connect: {
            id: room?.id,
          },
        },
        createdBy: {
          connect: {
            id: user?.id,
          },
        },
        createdFor: {
          connect: {
            id: +id!,
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}
export default withApiSession(withHandler({ methods: ["POST"], handler }));
