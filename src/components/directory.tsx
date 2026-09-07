"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  UserRound,
  Wrench,
  WalletCards,
  UsersRound,
  SlidersHorizontal,
  X,
  Fingerprint,
} from "lucide-react";
import { findProfiles, roles } from "@/lib/profiles";
import { ProfileCard } from "./profile-card";
import { PreviewNote } from "./shell";

const icons = [UserRound, UsersRound, Wrench, WalletCards, Wrench];
export function Directory() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState({ query: "", location: "" });
  const [role, setRole] = useState("All people");
  const [sort, setSort] = useState("name");
  const people = findProfiles(search.query, search.location, role, sort);
  const filtered = Boolean(
    search.query || search.location || role !== "All people",
  );
  function reset() {
    setQuery("");
    setLocation("");
    setSearch({ query: "", location: "" });
    setRole("All people");
  }
  return (
    <>
      <section className="discovery-hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow light">THE PEOPLE BEHIND THE KEYS</span>
            <h1>
              Find a car.
              <br className="small-only" /> <span>Person.</span>
            </h1>
            <p>
              Buying, financing, or keeping it running.
              <br className="desktop-only" /> Start with someone you want in
              your corner.
            </p>
          </div>
          <div className="hero-stamp" aria-hidden="true">
            <Fingerprint size={52} strokeWidth={1.4} />
            <span>
              YOUR PERSON.
              <br />
              FOR THE ROAD AHEAD.
            </span>
          </div>
          <form
            className="search-bar"
            onSubmit={(e) => {
              e.preventDefault();
              setSearch({ query, location });
            }}
          >
            <div className="search-field">
              <Search size={21} />
              <label className="sr-only" htmlFor="people-search">
                Name, dealership, brand, or specialty
              </label>
              <input
                id="people-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, dealership, brand, or specialty"
                autoComplete="off"
              />
            </div>
            <div className="search-field location-search">
              <MapPin size={21} />
              <label className="sr-only" htmlFor="location-search">
                City or state
              </label>
              <input
                id="location-search"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or state"
                autoComplete="address-level2"
              />
            </div>
            <button className="button button-blue" type="submit">
              Find my person <ArrowRight size={19} />
            </button>
          </form>
          <div className="hero-search-hint">
            <span>Try a city:</span>
            {["New Bern", "Raleigh", "Wilmington"].map((city) => (
              <button
                key={city}
                onClick={() => {
                  setLocation(city);
                  setSearch({ query, location: city });
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section
        className="directory-section page-width"
        aria-labelledby="directory-heading"
      >
        <div className="directory-heading">
          <div>
            <span className="eyebrow">MAKE A CONNECTION</span>
            <h2 id="directory-heading">Great people. All in one place.</h2>
          </div>
          <Link className="text-link" href="/for-professionals">
            In the car business? <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="role-filters" aria-label="Filter by profession">
          {["All people", ...roles].map((name, index) => {
            const Icon = index === 0 ? UsersRound : icons[index - 1];
            return (
              <button
                key={name}
                className={`filter-chip ${role === name ? "active" : ""}`}
                aria-pressed={role === name}
                onClick={() => setRole(name)}
              >
                <Icon size={17} />
                {name === "All people" ? name : name + "s"}
              </button>
            );
          })}
        </div>
        <PreviewNote />
        <div className="results-toolbar">
          <p aria-live="polite">
            <strong>{people.length}</strong>{" "}
            {people.length === 1 ? "person" : "people"}
            {search.location ? ` in ${search.location}` : " to get to know"}
            {filtered && (
              <button className="clear-filters" onClick={reset}>
                <X size={14} />
                Clear filters
              </button>
            )}
          </p>
          <label className="sort-control">
            <SlidersHorizontal size={16} />
            <span className="sr-only">Sort people</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="name">Name: A–Z</option>
              <option value="experience">Most experience</option>
              <option value="reviews">Most sample reviews</option>
            </select>
          </label>
        </div>
        {people.length > 0 ? (
          <div className="people-grid">
            {people.map((p) => (
              <ProfileCard person={p} key={p.slug} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={32} />
            <h3>No matches just yet.</h3>
            <p>
              Try a different name, city, or specialty. This preview has six
              example profiles in North Carolina.
            </p>
            <button className="button button-dark" onClick={reset}>
              See all people
            </button>
          </div>
        )}
      </section>
      <section className="ownership-band page-width">
        <div className="ownership-monogram" aria-hidden="true">
          <Fingerprint size={72} strokeWidth={1.3} />
        </div>
        <div>
          <span className="eyebrow">FOR THE PEOPLE IN THE BUSINESS</span>
          <h2>
            You build the reputation.
            <br />
            It should have your name on it.
          </h2>
          <p>
            A home for your story, your experience, and the people who trust
            you.
          </p>
        </div>
        <Link className="button button-dark" href="/studio">
          Build your profile <ArrowUpRight size={18} />
        </Link>
      </section>
    </>
  );
}
