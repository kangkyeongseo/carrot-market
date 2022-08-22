import type { NextPage } from "next";
import Layout from "../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar={true}>
      <div className="py-10 divide-y-[1px]">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-3 px-4 py-3 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm font-medium text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
