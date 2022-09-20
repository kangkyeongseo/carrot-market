import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";

const Create: NextPage = () => {
  return (
    <Layout canGoBack={true} title="Go Live">
      <form className="px-4 py-10 space-y-4">
        <Input required label="Name" name="name" type="text" />
        <Input
          required
          label="Price"
          name="price"
          kind="price"
          placeholder="0.00"
          type="text"
        />
        <TextArea name="description" label="Description" />
        <Button text="Go Live" />
      </form>
    </Layout>
  );
};

export default Create;
