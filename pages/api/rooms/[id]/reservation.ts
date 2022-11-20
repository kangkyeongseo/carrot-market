import withHandler, { IResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    query: { id },
  } = req;
  const existReservation = await client.reservation.findFirst({
    where: {
      roomId: +id!,
    },
  });
  if (existReservation) {
    await client.reservation.delete({
      where: {
        id: existReservation.id,
      },
    });
  } else {
    await client.reservation.create({
      data: {
        room: {
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
