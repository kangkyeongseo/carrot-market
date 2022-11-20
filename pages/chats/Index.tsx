import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Chat, Room, User } from "@prisma/client";

interface roomWithUserAndChat extends Room {
  ownerUser: User;
  productUser: User;
  chats: Chat[];
}

interface IRoomResponse {
  ok: boolean;
  rooms: roomWithUserAndChat[];
}

const Chats: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<IRoomResponse>("/api/rooms");
  console.log(data);
  return (
    <Layout title="채팅" hasTabBar={true}>
      <div className="py-10 divide-y-[1px]">
        {data && data.ok
          ? data?.rooms.map((room) => (
              <Link key={room.id} href={`/chats/${room.id}`}>
                <a className="flex items-center space-x-3 px-4 py-3 cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-slate-300" />
                  <div>
                    <p className="text-gray-700">
                      {user?.id === room.ownerUser.id
                        ? room.productUser.name
                        : room.ownerUser.name}
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      {room.chats[0]?.chat}
                    </p>
                  </div>
                </a>
              </Link>
            ))
          : null}
      </div>
    </Layout>
  );
};

export default Chats;
