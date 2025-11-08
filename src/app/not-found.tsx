import Link from "next/link";
import React from "react";

export default function Notfound() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <h1 className="font-bold text-2xl">Page Not Found</h1>
      <Link href={"/"}>Go Back Home</Link>
    </div>
  );
}
