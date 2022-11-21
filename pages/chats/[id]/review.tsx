import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutaion";
import { cls } from "@libs/client/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IReviewForm {
  review: string;
}

const LeaveReview: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IReviewForm>();
  const [starCount, setStarCount] = useState(0);
  const [postReview, { data, loading }] = useMutation(
    `/api/reviews/${router.query.id}`
  );
  const handleStar = (event: any) => {
    setStarCount(+event.target.parentElement.id);
  };
  const onVaild = ({ review }: IReviewForm) => {
    postReview({ review, starCount });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push("/");
    }
  }, []);
  return (
    <Layout canGoBack={true} title="Review">
      <form onSubmit={handleSubmit(onVaild)}>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              onClick={handleStar}
              key={star}
              id={star + ""}
              className={cls(
                starCount >= star ? "text-yellow-400" : "text-gray-400"
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <TextArea register={register("review")} />
        <Button text="Review" />
      </form>
    </Layout>
  );
};

export default LeaveReview;
