import Link from "next/link";
import {
  ArrowUpRight,
  Fingerprint,
  ContactRound,
  BriefcaseBusiness,
  Star,
  Link2,
  Check,
  UsersRound,
} from "lucide-react";
import { Avatar } from "@/components/profile-card";
export const metadata = { title: "A home for your automotive reputation" };

export default function ProfessionalsPage() {
  return (
    <>
      <section className="pro-hero">
        <div className="page-width pro-hero-inner">
          <div>
            <span className="eyebrow light">
              BUILT FOR THE PEOPLE IN THE BUSINESS
            </span>
            <h1>
              The dealership has a website.
              <br />
              <span>You should have a home.</span>
            </h1>
            <p>
              You’re the one answering the questions, earning the trust, and
              handing over the keys. Put your name at the center of your story.
            </p>
            <Link className="button button-lime" href="/studio">
              Start building your profile <ArrowUpRight size={19} />
            </Link>
            <small>
              Try the profile studio. No account needed for a local draft.
            </small>
          </div>
          <div className="pro-profile">
            <div className="pro-profile-label">
              <span>YOUR NAME ON IT</span>
              <Fingerprint size={23} />
            </div>
            <Avatar name="Your Name" color="blue" large />
            <h2>Your name goes here.</h2>
            <p>The person. Not just the dealership.</p>
            <div className="pro-profile-line" />
            <div className="pro-profile-detail">
              <ContactRound size={20} />
              <span>Your own public profile</span>
            </div>
            <div className="pro-profile-detail">
              <Star size={20} />
              <span>Your customers’ experiences</span>
            </div>
            <div className="pro-profile-detail">
              <BriefcaseBusiness size={20} />
              <span>Your career, across rooftops</span>
            </div>
            <div className="mini-link">mycarperson.com/your-name</div>
          </div>
        </div>
      </section>
      <section className="page-width pro-benefits">
        <span className="eyebrow">MORE THAN A DIGITAL BUSINESS CARD</span>
        <h2>Make your name mean something.</h2>
        <div className="benefit-grid">
          <article>
            <div className="benefit-icon">
              <ContactRound size={24} />
            </div>
            <h3>Be someone customers remember.</h3>
            <p>
              Bring your contact details, specialties, and story together in one
              recognizable place. Give people a reason to choose you.
            </p>
          </article>
          <article>
            <div className="benefit-icon">
              <Link2 size={24} />
            </div>
            <h3>One link. Every introduction.</h3>
            <p>
              A profile address and QR code for your business card, email
              signature, or social bio. The same introduction, wherever someone
              finds you.
            </p>
          </article>
          <article>
            <div className="benefit-icon">
              <UsersRound size={24} />
            </div>
            <h3>A reputation with room to grow.</h3>
            <p>
              We’re building toward customer reviews and career history
              connected to your profile, with a separate space for professional
              opportunities.
            </p>
          </article>
        </div>
      </section>
      <section className="page-width roadmap">
        <div>
          <span className="eyebrow">STARTING WITH YOU</span>
          <h2>
            A first step.
            <br />
            With a bigger road ahead.
          </h2>
          <p>
            Explore the profile experience now. Member accounts and live
            publishing are the next step, followed by the professional network.
          </p>
        </div>
        <ul className="roadmap-list">
          <li>
            <span>Profile studio & local drafts</span>
            <span className="roadmap-status current">
              <Check size={11} /> Available to try
            </span>
          </li>
          <li>
            <span>Member accounts & public publishing</span>
            <span className="roadmap-status">Next</span>
          </li>
          <li>
            <span>Live reviews & verification</span>
            <span className="roadmap-status">Planned</span>
          </li>
          <li>
            <span>Messaging & professional connections</span>
            <span className="roadmap-status">Planned</span>
          </li>
          <li>
            <span>Private career opportunities</span>
            <span className="roadmap-status">Planned</span>
          </li>
        </ul>
      </section>
    </>
  );
}
