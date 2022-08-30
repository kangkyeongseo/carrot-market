import Link from "next/link";
import React from "react";

interface IFloatingButtonProprs {
  href: string;
  children: React.ReactNode;
}

export default function FloadtingButton({
  href,
  children,
}: IFloatingButtonProprs) {
  return (
    <Link href={href}>
      <a className="fixed bottom-24 right-5 bg-orange-500 hover:bg-orange-600 border-0 border-transparent w-14 aspect-square rounded-full transition-colors cursor-pointer shadow-xl flex items-center justify-center text-white">
        {children}
      </a>
    </Link>
  );
}
