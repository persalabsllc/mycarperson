"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Share2,
  Copy,
  Download,
  Bookmark,
  Check,
  Star,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { type Profile } from "@/lib/profiles";
import { makeVCard } from "@/lib/draft";
import { useSavedPeople } from "./saved-provider";
import { Dialog } from "./dialog";

export function downloadText(content: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ShareProfile({ person }: { person: Profile }) {
  const [qr, setQr] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  async function prepare() {
    const link = new URL(`/${person.slug}`, window.location.origin).toString();
    setUrl(link);
    setStatus("");
    try {
      const QRCode = await import("qrcode");
      setQr(
        await QRCode.toDataURL(link, {
          width: 420,
          margin: 2,
          color: { dark: "#132034", light: "#ffffff" },
        }),
      );
    } catch {
      setStatus(
        "The QR code could not load. You can still copy the profile address below.",
      );
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Profile link copied.");
    } catch {
      setStatus(
        "Copy is unavailable in this browser. Select and copy the address above.",
      );
    }
  }
  return (
    <Dialog
      title="A person worth sharing."
      trigger={
        <>
          <Share2 size={16} />
          Share profile
        </>
      }
      buttonClass="button cover-share"
      onOpen={prepare}
    >
      <div className="qr-block">
        <p>
          Share {person.name.split(" ")[0]}’s example profile, or scan the code
          to open it on another device.
        </p>
        {qr ? (
          <Image
            src={qr}
            alt={`QR code for ${person.name}'s example profile`}
            width={210}
            height={210}
            unoptimized
          />
        ) : (
          <p>Preparing QR code…</p>
        )}
        <div className="share-url" tabIndex={0}>
          {url}
        </div>
        <button className="button button-blue full" onClick={copy}>
          <Copy size={17} />
          Copy profile link
        </button>
        {qr && (
          <a className="text-link" href={qr} download={`${person.slug}-qr.png`}>
            <Download size={16} />
            Download QR code
          </a>
        )}
        <p role="status">{status}</p>
      </div>
    </Dialog>
  );
}

export function ContactCard({ person }: { person: Profile }) {
  const { saved, toggle, ready } = useSavedPeople();
  const isSaved = saved.includes(person.slug);
  const [status, setStatus] = useState("");
  return (
    <div className="contact-card">
      <h2>Your person. One tap away.</h2>
      <p>
        Keep {person.name.split(" ")[0]}’s profile handy for the road ahead.
      </p>
      <button
        disabled={!ready}
        className={`button full ${isSaved ? "button-dark" : "button-blue"}`}
        aria-pressed={isSaved}
        onClick={() => toggle(person.slug)}
      >
        {isSaved ? <Check size={18} /> : <Bookmark size={18} />}
        {isSaved ? "Saved to your people" : "Save as my car person"}
      </button>
      <button
        className="button button-outline full"
        onClick={() => {
          try {
            downloadText(
              makeVCard(
                person,
                new URL(`/${person.slug}`, window.location.origin).toString(),
              ),
              `${person.slug}-example.vcf`,
              "text/vcard;charset=utf-8",
            );
            setStatus("Example contact card downloaded.");
          } catch {
            setStatus(
              "We couldn't download the contact card. Please try again.",
            );
          }
        }}
      >
        <Download size={17} />
        Download sample contact
      </button>
      <div className="contact-items">
        <div>
          <Phone size={15} />
          <span>{person.phone}</span>
        </div>
        <div>
          <Mail size={15} />
          <span>{person.email}</span>
        </div>
        <div>
          <MapPin size={15} />
          <span>
            {person.city}, {person.state}
          </span>
        </div>
      </div>
      <div className="contact-footnote">
        Example contact details. Saved people stay on this device; no account is
        required in this preview.
      </div>
      {status && (
        <p className="status-text" role="status">
          {status}
        </p>
      )}
    </div>
  );
}

export function ReviewForm({ name }: { name: string }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState<{
    name: string;
    title: string;
    body: string;
    experience: string;
    rating: number;
  } | null>(null);
  return (
    <Dialog
      title={`Review your experience with ${name.split(" ")[0]}`}
      trigger="Try a review"
      buttonClass="button button-outline compact"
    >
      <p className="dialog-intro">
        Try the review experience. This is a preview only: your review is not
        sent, saved, or published.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setReview({
            name: String(data.get("name") || "").trim(),
            title: String(data.get("title") || "").trim(),
            body: String(data.get("body") || "").trim(),
            experience: String(data.get("experience")),
            rating,
          });
        }}
      >
        <fieldset className="rating-input">
          <legend>Your rating</legend>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              type="button"
              key={value}
              aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
              aria-pressed={rating === value}
              onClick={() => setRating(value)}
            >
              <Star
                size={29}
                fill={value <= rating ? "currentColor" : "none"}
              />
            </button>
          ))}
        </fieldset>
        <div className="form-field">
          <label htmlFor="review-name">Your display name</label>
          <input
            id="review-name"
            name="name"
            required
            minLength={2}
            maxLength={70}
            placeholder="Jamie R."
          />
        </div>
        <div className="form-field">
          <label htmlFor="review-experience">Your experience</label>
          <select id="review-experience" name="experience">
            <option>Purchased a vehicle</option>
            <option>Serviced a vehicle</option>
            <option>Financed a vehicle</option>
            <option>Traded a vehicle</option>
            <option>Asked for advice</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="review-title">Sum it up</label>
          <input
            id="review-title"
            name="title"
            required
            minLength={5}
            maxLength={100}
            placeholder="What stood out?"
          />
        </div>
        <div className="form-field">
          <label htmlFor="review-body">Tell your story</label>
          <textarea
            id="review-body"
            name="body"
            required
            minLength={20}
            maxLength={2000}
            placeholder="What would you want the next customer to know?"
          />
        </div>
        <button type="submit" className="button button-blue full">
          Preview my review
        </button>
      </form>
      {review && (
        <div className="review-preview" role="status">
          <span className="eyebrow">PREVIEW · NOT PUBLISHED</span>
          <strong>
            {review.name} · {review.rating}/5
          </strong>
          <h3>{review.title}</h3>
          <p>{review.body}</p>
          <span className="tag">{review.experience}</span>
        </div>
      )}
    </Dialog>
  );
}
