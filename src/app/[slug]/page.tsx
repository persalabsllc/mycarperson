import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  BriefcaseBusiness,
  Star,
  Fingerprint,
  ArrowUpRight,
} from "lucide-react";
import { profiles, averageRating, initials } from "@/lib/profiles";
import { Avatar } from "@/components/profile-card";
import { PreviewNote } from "@/components/shell";
import {
  ShareProfile,
  ContactCard,
  ReviewForm,
} from "@/components/profile-actions";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return profiles.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = profiles.find((p) => p.slug === slug);
  return {
    title: person
      ? `${person.name} — ${person.role} (Example)`
      : "Person not found",
    description: person
      ? `Example profile: ${person.name}, ${person.role} in ${person.city}, ${person.state}. ${person.headline}`
      : "This profile is not available.",
  };
}
function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          aria-hidden="true"
          key={n}
          size={15}
          fill={n <= rating ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params;
  const person = profiles.find((p) => p.slug === slug);
  if (!person) notFound();
  const first = person.name.split(" ")[0];
  return (
    <div className="page-width inner-page">
      <div className="breadcrumbs">
        <Link href="/">Find your person</Link>
        <ChevronRight size={13} />
        <span>{person.name}</span>
      </div>
      <PreviewNote>
        This is a fictional example profile. Reviews, work history, and contact
        details are for demonstration.
      </PreviewNote>
      <div className="profile-cover">
        <div>
          <span className="eyebrow">THE PERSON BEHIND THE PROFILE</span>
          <h2>{person.headline}</h2>
        </div>
        <ShareProfile person={person} />
      </div>
      <div className="profile-layout">
        <div className="profile-main">
          <section className="profile-identity">
            <Avatar name={person.name} color={person.color} large />
            <h1>{person.name}</h1>
            <p className="profile-role">
              {person.role} at <strong>{person.dealership}</strong>
            </p>
            <div className="profile-meta">
              <span>
                <MapPin size={16} />
                {person.city}, {person.state}
              </span>
              <span>
                <BriefcaseBusiness size={16} />
                {person.years} years in automotive
              </span>
              <span className="rating">
                <Star size={15} fill="currentColor" />
                <strong>{averageRating(person.reviews)}</strong> ·{" "}
                {person.reviews.length} sample reviews
              </span>
            </div>
            <div className="tag-row">
              {person.specialties.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </section>
          <nav className="profile-tabs" aria-label="Profile sections">
            <a href="#about">About {first}</a>
            <a href="#reviews">Reviews ({person.reviews.length})</a>
            <a href="#experience">Experience</a>
          </nav>
          <section className="profile-content-section" id="about">
            <h2>A little about me</h2>
            <p>{person.bio}</p>
            <dl className="detail-pairs">
              <div>
                <dt>BRANDS I KNOW</dt>
                <dd>
                  <div className="tag-row">
                    {person.brands.map((b) => (
                      <span className="tag" key={b}>
                        {b}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
              <div>
                <dt>LET’S TALK IN</dt>
                <dd>{person.languages.join(" · ")}</dd>
              </div>
            </dl>
          </section>
          <section className="profile-content-section" id="reviews">
            <div className="reviews-heading">
              <h2>From the driver’s seat</h2>
              <ReviewForm name={person.name} />
            </div>
            <div className="reviews-summary">
              <span className="review-score">
                {averageRating(person.reviews)}
              </span>
              <div>
                <Stars
                  rating={Math.round(Number(averageRating(person.reviews)))}
                />
                <p>
                  {person.reviews.length} illustrative reviews · Not verified
                  customer feedback
                </p>
              </div>
            </div>
            {person.reviews.map((review) => (
              <article className="review" key={review.name}>
                <div className="review-top">
                  <span className="review-initial" aria-hidden="true">
                    {initials(review.name)}
                  </span>
                  <div className="review-author">
                    <strong>{review.name}</strong>
                    <p>
                      {new Intl.DateTimeFormat("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                      }).format(new Date(review.date))}
                    </p>
                  </div>
                  <Stars rating={review.rating} />
                </div>
                <h3>{review.title}</h3>
                <p>{review.body}</p>
                <span className="tag">{review.experience} · Sample</span>
              </article>
            ))}
          </section>
          <section className="profile-content-section" id="experience">
            <h2>My road so far</h2>
            {person.experience.map((item) => (
              <div className="timeline-item" key={item.company + item.dates}>
                <h3>{item.title}</h3>
                <p>{item.company}</p>
                <span>{item.dates}</span>
              </div>
            ))}
          </section>
        </div>
        <aside className="profile-aside">
          <ContactCard person={person} />
          <div className="profile-promo">
            <Fingerprint size={31} />
            <h3>There’s a place for your story, too.</h3>
            <p>
              In the car business? Start building a profile that puts your name
              first.
            </p>
            <Link className="text-link" href="/studio">
              Create your draft <ArrowUpRight size={17} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
