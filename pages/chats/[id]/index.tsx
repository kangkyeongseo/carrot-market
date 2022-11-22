import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Chat, Reservation, Room, User } from "@prisma/client";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutaion";
import { useEffect } from "react";

interface RoomWithChatAndUserAndReservation extends Room {
  chats: Chat[];
  ownerUser: User;
  productUser: User;
  reservation: Reservation[];
}

interface IRoomResponse {
  ok: boolean;
  room: RoomWithChatAndUserAndReservation;
  isReservation: boolean;
  isReview: boolean;
}

interface IChatForm {
  chat: string;
}

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<IRoomResponse>(
    router.query.id ? `/api/rooms/${router.query.id}` : null
  );
  const [createChat, { data: chatData, loading }] = useMutation(
    `/api/rooms/${router.query.id}/chat`
  );
  const [
    createReservation,
    { data: reservationData, loading: reservationLoading },
  ] = useMutation(`/api/rooms/${router.query.id}/reservation`);
  const { register, handleSubmit, reset } = useForm<IChatForm>();
  const onValid = (form: IChatForm) => {
    if (loading) return;
    reset();
    createChat(form);
  };
  useEffect(() => {
    if (chatData && chatData.ok) {
      mutate();
    }
  }, [chatData, mutate]);
  useEffect(() => {
    if (reservationData && reservationData.ok) {
      mutate();
    }
  }, [reservationData, mutate]);
  const handleReservationClick = () => {
    createReservation({});
  };
  const handleReviewClick = () => {
    router.push(`/chats/${data?.room.id}/review`);
  };
  return (
    <Layout
      canGoBack={true}
      title={
        data?.room.ownerUserId === user?.id
          ? data?.room.productUser.name
          : data?.room.ownerUser.name
      }
    >
      {data?.room.ownerUserId === user?.id ? (
        <button
          onClick={handleReservationClick}
          className="fixed w-48 top-16 left-1/2 right-1/2 -ml-24 bg-orange-400 text-white rounded-lg hover:bg-orange-600"
        >
          {data && reservationLoading
            ? "Loading..."
            : !data?.isReservation
            ? "Make a reservation"
            : "Cancel reservation"}
        </button>
      ) : null}
      {data?.room.productUserId === user?.id ? (
        <button
          onClick={handleReviewClick}
          className="fixed w-48 top-16 left-1/2 right-1/2 -ml-24 bg-orange-400 text-white rounded-lg hover:bg-orange-600"
        >
          Leave a review
        </button>
      ) : null}
      <div className="px-4 py-16 pb-16 space-y-4">
        {data?.room?.chats.map((chat) => (
          <Message
            key={chat.id}
            message={chat.chat}
            reversed={chat.userId === user?.id ? true : false}
          />
        ))}
        <form
          onSubmit={handleSubmit(onValid)}
          className="fixed w-full mx-auto max-w-md bottom-4 inset-x-0"
        >
          <div className="flex items-center relative">
            <input
              {...register("chat", { required: true })}
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
