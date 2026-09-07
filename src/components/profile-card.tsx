"use client";

import Link from "next/link";
import { MapPin, ArrowUpRight, Star, Bookmark, Check } from "lucide-react";
import { Profile, initials, averageRating } from "@/lib/profiles";
import { useSavedPeople } from "./saved-provider";

export function Avatar({
  name,
  color,
  large = false,
}: {
  name: string;
  color: string;
  large?: boolean;
}) {
  return (
    <span
      className={`avatar color-${color} ${large ? "avatar-large" : ""}`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

export function ProfileCard({ person }: { person: Profile }) {
  const { saved, toggle, ready } = useSavedPeople();
  const isSaved = saved.includes(person.slug);
  return (
    <article className="person-card">
      <div className={`card-banner color-${person.color}`}>
        <span className="card-banner-label">{person.role}</span>
        <button
          className={`save-button ${isSaved ? "is-saved" : ""}`}
          aria-label={`${isSaved ? "Unsave" : "Save"} ${person.name}`}
          aria-pressed={isSaved}
          disabled={!ready}
          onClick={() => toggle(person.slug)}
        >
          {isSaved ? <Check size={18} /> : <Bookmark size={18} />}
        </button>
      </div>
      <div className="person-card-body">
        <div className="avatar-row">
          <Avatar name={person.name} color={person.color} />
          <span className="sample-tag">Example profile</span>
        </div>
        <Link className="person-name" href={`/${person.slug}`}>
          <h3>{person.name}</h3>
          <ArrowUpRight size={20} />
        </Link>
        <p className="dealership">{person.dealership}</p>
        <p className="location">
          <MapPin size={14} />
          {person.city}, {person.state}
        </p>
        <p className="person-headline">{person.headline}</p>
        <div className="tag-row">
          {person.specialties.slice(0, 2).map((s) => (
            <span className="tag" key={s}>
              {s}
            </span>
          ))}
        </div>
        <div className="person-card-bottom">
          <span className="rating">
            <Star size={15} fill="currentColor" />
            <strong>{averageRating(person.reviews)}</strong>
            <span>
              ({person.reviews.length} sample{" "}
              {person.reviews.length === 1 ? "review" : "reviews"})
            </span>
          </span>
          <span>{person.years} yrs</span>
        </div>
      </div>
    </article>
  );
}
