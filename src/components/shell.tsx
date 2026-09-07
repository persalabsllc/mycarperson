"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Fingerprint, Bookmark } from "lucide-react";
import { useState } from "react";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${inverse ? "inverse" : ""}`}
      aria-label="MyCarPerson home"
    >
      <span className="brand-mark">
        <Fingerprint size={27} strokeWidth={2} />
      </span>
      <span>
        mycar<span className="brand-person">person</span>
        <span className="brand-period">.</span>
      </span>
    </Link>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link aria-current={path === "/" ? "page" : undefined} href="/">
              Find your person
            </Link>
            <Link
              aria-current={path === "/for-professionals" ? "page" : undefined}
              href="/for-professionals"
            >
              For car people
            </Link>
          </nav>
          <div className="header-actions">
            <Link className="saved-link" href="/saved">
              <Bookmark size={18} />
              <span>Saved people</span>
            </Link>
            <Link className="button button-dark compact" href="/studio">
              Build your profile <ArrowUpRight size={17} />
            </Link>
          </div>
          <button
            className="mobile-toggle icon-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ["/", "Find your person"],
              ["/for-professionals", "For car people"],
              ["/saved", "Saved people"],
              ["/studio", "Build your profile"],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Brand />
          <p>Good people. Lasting connections.</p>
        </div>
        <div className="footer-links">
          <Link href="/">Find your person</Link>
          <Link href="/for-professionals">For professionals</Link>
          <Link href="/studio">Profile studio</Link>
        </div>
        <p className="footer-note">
          MyCarPerson · Product preview
          <br />
          Your name. Your reputation. Your career.
        </p>
      </div>
    </footer>
  );
}

export function PreviewNote({ children }: { children?: React.ReactNode }) {
  return (
    <div className="preview-note">
      <span className="preview-label">EARLY PREVIEW</span>
      <span>
        {children ||
          "Explore the experience. People, workplaces, and reviews shown are fictional examples."}
      </span>
    </div>
  );
}
