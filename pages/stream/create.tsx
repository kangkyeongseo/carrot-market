import type { NextPage } from "next";
import Layout from "../components/layout";

const Create: NextPage = () => {
  return (
    <Layout canGoBack={true}>
      <div className="px-4 py-16 space-y-5">
        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="rounded-md shadow-sm relative flex items-center">
            <input
              id="price"
              type="text"
              placeholder="Name"
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <div className="rounded-md shadow-sm relative flex items-center">
            <div className="absolute left-0 pl-3 flex justify-center items-center pointer-events-none">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <input
              id="price"
              type="text"
              placeholder="0.00"
              className="appearance-none w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="absolute right-0 pr-3 flex justify-center items-center pointer-events-none">
              <span className="text-gray-500 text-sm">USD</span>
            </div>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="mt-1 shadow-sm w-full resize-none focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
            rows={4}
          />
        </div>
        <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
          Go Live
        </button>
      </div>
    </Layout>
  );
};

export default Create;
