import type { NextPage } from "next";
import Layout from "@components/layout";
import ProductList from "@components/product-list";

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack={true}>
      <div className="flex flex-col space-y-5 py-10">
        <ProductList kind="fav" />
      </div>
    </Layout>
  );
};

export default Loved;
