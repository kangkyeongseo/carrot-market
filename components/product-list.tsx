import { ProdcutWithFavsCount } from "pages";
import useSWR from "swr";
import Item from "./item";

interface IProductListProps {
  kind: "fav" | "sales" | "purchases";
}

interface Record {
  id: number;
  product: ProdcutWithFavsCount;
}

interface IProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: IProductListProps) {
  const { data } = useSWR<IProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data?.[kind]?.map((record) => (
        <Item
          key={record.id}
          id={record.product.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  ) : null;
}
