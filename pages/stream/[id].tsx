import type { NextPage } from "next";
import Layout from "../components/layout";

const StreamDetail: NextPage = () => {
  return (
    <Layout canGoBack={true}>
      <div className="px-4 py-10 space-y-4">
        <div className="w-full bg-slate-300 aspect-video rounded-md shadow-sm" />
        <h3 className=" text-gray-800 font-semibold text-2xl mt-2">
          Stream Title
        </h3>
        <div className="space-y-2">
          <h5 className="font-medium text-xl">$150</h5>
          <p className="text-sm">
            {" "}
            My money&apos;s in that office, right? If she start giving me some
            bullshit about it ain&apos;t there, and we got to go someplace else
            and get it, I&apos;m gonna shoot you in the head then and there.
            Then I&apos;m gonna shoot that bitch in the kneecaps, find out where
            my goddamn money is. She gonna tell me too. Hey, look at me when
            I&apos;m talking to you, motherfucker. You listen: we go in there,
            and that ni**a Winston or anybody else is in there, you the first
            motherfucker to get shot. You understand?
          </p>
        </div>
        <div className="space-y-2">
          <h5 className="font-medium text-xl">Live Chat</h5>
          <div className="h-[50vh] overflow-y-scroll px-4 py-10 pb-16 space-y-4">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-400" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p>Hi how much are you selling them for?</p>
              </div>
            </div>
            <div className="flex flex-row-reverse items-start space-x-reverse space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-400" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p> I want $20,000</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-400" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p>Hi how much are you selling them for?</p>
              </div>
            </div>
            <div className="flex flex-row-reverse items-start space-x-reverse space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-400" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p> I want $20,000</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-400" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p>Hi how much are you selling them for?</p>
              </div>
            </div>
            <div className="flex flex-row-reverse items-start space-x-reverse space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-400" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p> I want $20,000</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-400" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p>Hi how much are you selling them for?</p>
              </div>
            </div>
            <div className="flex flex-row-reverse items-start space-x-reverse space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-400" />
              <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
                <p> I want $20,000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed w-full mx-auto max-w-md bottom-4 inset-x-0">
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
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
