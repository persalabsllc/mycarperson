"use client";
import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { profiles } from "@/lib/profiles";
import { useSavedPeople } from "./saved-provider";
import { ProfileCard } from "./profile-card";
import { PreviewNote } from "./shell";

export function SavedPeople() {
  const { saved, ready } = useSavedPeople();
  const people = profiles.filter((p) => saved.includes(p.slug));
  return (
    <div className="page-width inner-page saved-page">
      <div className="saved-heading">
        <div className="page-heading">
          <span className="eyebrow">YOUR SHORTLIST</span>
          <h1>Your car people.</h1>
          <p>
            Good connections are worth keeping. Your saved profiles stay on this
            device.
          </p>
        </div>
        <Link className="text-link" href="/">
          Find more <ArrowRight size={17} />
        </Link>
      </div>
      <PreviewNote />
      {!ready ? (
        <p className="loading-text" role="status">
          Loading your saved people…
        </p>
      ) : people.length ? (
        <div className="people-grid">
          {people.map((person) => (
            <ProfileCard key={person.slug} person={person} />
          ))}
        </div>
      ) : (
        <div className="empty-state" style={{ marginTop: 25 }}>
          <Bookmark size={34} />
          <h2>Your next connection starts here.</h2>
          <p>
            Tap the bookmark on a profile to keep your favorite car people
            together.
          </p>
          <Link className="button button-blue" href="/">
            Find your person <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
