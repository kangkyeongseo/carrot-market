import type { NextPage } from "next";
import Layout from "../components/layout";

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack={true}>
      <div className="px-4 py-10 space-y-4">
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
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone number
          </label>
          <div className="flex rounded-sm shadow-sm">
            <span className="flex justify-center items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
              +82
            </span>
            <input
              id="phone"
              type="number"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>
        </div>
        <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          Update Profile
        </button>
      </div>
    </Layout>
  );
};

export default EditProfile;
