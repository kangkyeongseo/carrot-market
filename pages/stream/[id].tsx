import type { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutaion";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";

interface IStreamMessages {
  id: number;
  message: string;
  user: {
    avatar: string | null;
    id: number;
  };
}

interface IStreamWithMessages extends Stream {
  messages: IStreamMessages[];
}

interface IStreamRespinse {
  ok: boolean;
  stream: IStreamWithMessages;
}

interface IMessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const { user } = useUser();
  const { query } = useRouter();
  const { register, handleSubmit, reset } = useForm<IMessageForm>();
  const { data, mutate } = useSWR<IStreamRespinse>(
    query.id ? `/api/streams/${query.id}` : null
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${query.id}/messages`
  );
  const onValid = (form: IMessageForm) => {
    if (loading) return;
    reset();
    sendMessage(form);
  };
  useEffect(() => {
    if (sendMessageData && sendMessageData.ok) {
      mutate();
    }
  }, [sendMessageData]);
  return (
    <Layout canGoBack={true}>
      <div className="px-4 py-10 space-y-4">
        <div className="w-full bg-slate-300 aspect-video rounded-md shadow-sm" />
        <h3 className=" text-gray-800 font-semibold text-2xl mt-2">
          {data?.stream?.name}
        </h3>
        <div className="space-y-2">
          <h5 className="font-medium text-xl">${data?.stream?.price}</h5>
          <p className="text-sm">{data?.stream?.description}</p>
        </div>
        <div className="space-y-2">
          <h5 className="font-medium text-xl">Live Chat</h5>
          <div className="h-[50vh] overflow-y-scroll px-4 py-10 pb-16 space-y-4">
            {data?.stream?.messages?.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user.id}
              />
            ))}
          </div>
        </div>
        <div className="fixed w-full mx-auto max-w-md bottom-4 inset-x-0">
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex items-center relative"
          >
            <input
              {...register("message", { required: true })}
              type="text"
              className="pr-12 shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex p-1.5 right-0">
              <button className="flex items-center justify-center bg-orange-500 rounded-full px-3 text-sm text-white hover:bg-orange-600 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
                &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
