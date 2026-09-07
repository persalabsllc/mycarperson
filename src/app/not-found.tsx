import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="not-found">
      <span className="eyebrow">A LITTLE OFF THE MAP</span>
      <h1>We couldn’t find that page.</h1>
      <p>
        The address may have changed, or this profile hasn’t been published yet.
        Let’s get you back to the people.
      </p>
      <Link className="button button-blue" href="/">
        Find your person <ArrowRight size={18} />
      </Link>
    </div>
  );
}
