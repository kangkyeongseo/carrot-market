import { cls } from "@libs/client/utils";

interface IButtonProps {
  large?: boolean;
  text: string;
}

export default function Button({ large = false, text }: IButtonProps) {
  return (
    <button
      className={cls(
        "w-full bg-orange-500 hover:bg-orange-600 text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm"
      )}
    >
      {text}
    </button>
  );
}
