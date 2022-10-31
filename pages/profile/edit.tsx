import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutaion";
import { useRouter } from "next/router";

interface IEditProfileForm {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface IEditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<IEditProfileForm>();
  useEffect(() => {
    if (user?.name) {
      setValue("name", user.name);
    }
    if (user?.email) {
      setValue("email", user.email);
    }
    if (user?.phone) {
      setValue("phone", user.phone);
    }
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<IEditProfileResponse>(`/api/users/me`);
  const onValid = ({ name, email, phone, avatar }: IEditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      setError("formErrors", {
        message: "Email or Phone number are required. You need to choose one",
      });
    }
    editProfile({ email, phone, name });
  };
  useEffect(() => {
    if (data && !data.ok) {
      setError("formErrors", { message: data.error });
    }
    if (data && data.ok) {
      router.push(`/profile`);
    }
  }, [data, setError, router]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout canGoBack={true} title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 bg-slate-300 rounded-full"
            />
          ) : (
            <div className="w-14 h-14 bg-slate-300 rounded-full" />
          )}
          <label
            htmlFor="avatar"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700"
          >
            Change Avatar
            <input
              {...register("avatar")}
              type="file"
              id="avatar"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}

        <Button text={loading ? "Loading" : "Update Profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
