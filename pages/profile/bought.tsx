import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Bougth: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack={true}>
      <div className="flex flex-col space-y-5 py-10">
        <ProductList kind="purchases" />
      </div>
    </Layout>
  );
};

export default Bougth;
