import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Chat, Room } from "@prisma/client";
import useUser from "@libs/client/useUser";

interface RoomWithChat extends Room {
  chats: Chat[];
}

interface IRoomResponse {
  ok: boolean;
  room: RoomWithChat;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data } = useSWR<IRoomResponse>(`/api/rooms/${router.query.id}`);
  return (
    <Layout canGoBack={true} title="KKS">
      <div className="px-4 py-10 pb-16 space-y-4">
        {data?.room?.chats.map((chat) => (
          <Message
            message={chat.chat}
            reversed={chat.userId === user.id ? true : false}
          />
        ))}
        <form className="fixed w-full mx-auto max-w-md bottom-4 inset-x-0">
          <div className="flex items-center relative">
            <input
              type="text"
              className="pr-12 shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex p-1.5 right-0">
              <button className="flex items-center justify-center bg-orange-500 rounded-full px-3 text-sm text-white hover:bg-orange-600 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
