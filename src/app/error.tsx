"use client";
import Link from "next/link";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="not-found">
      <span className="eyebrow">A SMALL BUMP IN THE ROAD</span>
      <h1>Something didn’t load.</h1>
      <p>
        Please try again. Your previously saved local draft will still be on
        this device if browser storage is available.
      </p>
      <button className="button button-blue" onClick={reset}>
        Try again
      </button>{" "}
      <Link className="button button-outline" href="/">
        Back to the directory
      </Link>
    </div>
  );
}
