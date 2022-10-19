import type { NextPage } from "next";
import FloadtingButton from "@components/floating-button";
import Item from "@components/item";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";

export interface ProdcutWithFavsCount extends Product {
  _count: { favs: number };
}

interface IProductResponse {
  ok: boolean;
  products: ProdcutWithFavsCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<IProductResponse>("/api/products");
  return (
    <Layout title="홈" hasTabBar={true}>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 py-10 ">
        {data?.products?.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={product._count.favs}
          />
        ))}
        <FloadtingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloadtingButton>
      </div>
    </Layout>
  );
};

export default Home;
