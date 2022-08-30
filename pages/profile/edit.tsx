import type { NextPage } from "next";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack={true} title="Edit Profile">
      <form className="px-4 py-10 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-slate-300 rounded-full" />
          <label
            htmlFor="avatar"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700"
          >
            Change Avatar
            <input
              type="file"
              id="avatar"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input required label="Email address" name="email" type="email" />
        <Input
          required
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        <Button text="Update Profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
