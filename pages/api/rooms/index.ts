import withHandler, { IResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Room } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const { session } = req;
  let rooms: Room[] = [];
  const user = await client?.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      ownerRooms: {
        include: {
          ownerUser: true,
          productUser: true,
        },
      },
      productRooms: {
        include: {
          ownerUser: true,
          productUser: true,
        },
      },
      chats: {
        take: 1,
      },
    },
  });
  user?.ownerRooms.forEach((room) => rooms.push(room));
  user?.productRooms.forEach((room) => rooms.push(room));
  res.json({
    ok: true,
    rooms,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
