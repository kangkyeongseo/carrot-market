import type { NextPage } from "next";
import Link from "next/link";
import FloadtingButton from "@components/floating-button";
import Layout from "@components/layout";
import useSWR from "swr";
import { useEffect } from "react";
import { Stream } from "@prisma/client";
import Image from "next/image";

interface IStreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Stream: NextPage = () => {
  const { data, error } = useSWR<IStreamsResponse>(`/api/streams`);
  return (
    <Layout title="라이브" hasTabBar={true}>
      <div className="py-10 space-y-4 divide-y-2">
        {data?.streams.map((stream) => (
          <Link key={stream.id} href={`/stream/${stream.id}`}>
            <a className="pt-4 px-4 ">
              <div className="relative overflow-hidden w-full bg-slate-300 aspect-video rounded-md shadow-sm">
                <Image
                  layout="fill"
                  src={`http://videodelivery.net/${stream.cloudflareId}/thumbnails/thumbmail.jpg?height=320`}
                />
              </div>
              <h3 className=" text-gray-700 text-lg mt-2">{stream.name}</h3>
            </a>
          </Link>
        ))}
        <FloadtingButton href="/stream/create">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </FloadtingButton>
      </div>
    </Layout>
  );
};

export default Stream;
