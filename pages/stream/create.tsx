import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutaion";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";

interface IStreamForm {
  name: string;
  price: string;
  description: string;
}

interface IStreamResponse {
  ok: boolean;
  stream: Stream;
}

const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IStreamForm>();
  const [createStream, { data, loading }] =
    useMutation<IStreamResponse>(`/api/streams`);
  const onValid = (form: IStreamForm) => {
    if (loading) return;
    createStream(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/stream/${data?.stream.id}`);
    }
  }, [data]);
  return (
    <Layout canGoBack={true} title="Go Live">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10 space-y-4">
        <Input
          register={register("name", { required: true })}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          required
          label="Price"
          name="price"
          kind="price"
          type="text"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
        />
        <Button text={loading ? "Loading" : "Go Live"} />
      </form>
    </Layout>
  );
};

export default Create;
