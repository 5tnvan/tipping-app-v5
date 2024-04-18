"use client";

import Link from "next/link";
import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <>
      <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
        Back
      </button>
      <div className="flex flex-col justify-center items-center h-full font-medium pl-6 pr-6">
        <p>Sorry, something went wrong. Please try again later.</p>
        <Link href="/" className="btn btn-secondary w-full mt-2">
          Go Home
        </Link>
      </div>
    </>
  );
}
