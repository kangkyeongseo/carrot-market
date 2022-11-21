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
    session: { user },
  } = req;
  const product = await client.product.findFirst({
    where: {
      id: +id!,
    },
  });
  if (req.method === "GET") {
    const room = await client.room.findFirst({
      where: {
        id: +id!,
      },
      include: {
        chats: true,
        ownerUser: {
          select: {
            name: true,
          },
        },
        productUser: {
          select: {
            name: true,
          },
        },
        reservation: {
          select: {
            createdAt: true,
          },
        },
      },
    });

    const reservation = await client.reservation.findFirst({
      where: {
        roomId: room?.id,
      },
    });

    const isReservation = Boolean(reservation);

    let isReview;

    if (!reservation) {
      isReview = false;
    } else {
      isReview = Boolean(
        Date.now() - reservation?.createdAt.getTime() > 1000 * 3600 * 24 * 7
      );
    }

    res.json({
      ok: true,
      room,
      isReservation,
      isReview,
    });
  }
  if (req.method === "POST") {
    const existRoom = await client.room.findFirst({
      where: {
        productUserId: user?.id,
        ownerUserId: product?.userId,
        productId: +id!.toString(),
      },
    });
    if (!existRoom) {
      const room = await client.room.create({
        data: {
          productUser: {
            connect: {
              id: user?.id,
            },
          },
          ownerUser: {
            connect: {
              id: product?.userId,
            },
          },
          product: {
            connect: {
              id: +id!.toString(),
            },
          },
        },
      });
      res.json({
        ok: true,
        room,
      });
    } else {
      res.json({
        ok: true,
        existRoom,
      });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
