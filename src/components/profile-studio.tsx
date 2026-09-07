"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Save,
  Download,
  Upload,
  Trash2,
  Check,
  MapPin,
  Fingerprint,
  Eye,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";
import {
  DRAFT_KEY,
  draftSchema,
  emptyDraft,
  parseDraft,
  slugify,
  splitTags,
  type ProfileDraft,
  makeVCard,
} from "@/lib/draft";
import { roles } from "@/lib/profiles";
import { Avatar } from "./profile-card";
import { PreviewNote } from "./shell";
import { downloadText } from "./profile-actions";
import { Dialog } from "./dialog";

type Field = keyof ProfileDraft;
type Errors = Partial<Record<Field, string>>;

function TextField({
  label,
  field,
  draft,
  error,
  update,
  hint,
  type = "text",
  maxLength = 100,
  placeholder,
  required,
}: {
  label: string;
  field: Field;
  draft: ProfileDraft;
  error?: string;
  update: (field: Field, value: string) => void;
  hint?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
}) {
  const id = `draft-${field}`;
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        value={String(draft[field])}
        onChange={(e) => update(field, e.target.value)}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        required={required}
        autoComplete={
          field === "name"
            ? "name"
            : field === "email"
              ? "email"
              : field === "phone"
                ? "tel"
                : field === "city"
                  ? "address-level2"
                  : "off"
        }
      />
      {hint && (
        <span className="field-hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      {error && (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export function MiniProfile({
  draft,
  detailed = false,
  onPreview,
}: {
  draft: ProfileDraft;
  detailed?: boolean;
  onPreview?: () => void;
}) {
  return (
    <div className="mini-profile">
      <div className={`mini-cover color-${draft.color}`}>
        <span>YOUR PERSON. FOR THE ROAD AHEAD.</span>
        <Fingerprint size={22} />
      </div>
      <div className="mini-body">
        <Avatar name={draft.name || "Your Name"} color={draft.color} />
        <h2>{draft.name || "Your name here"}</h2>
        <p>
          {draft.role}
          {draft.dealership ? ` at ${draft.dealership}` : " · Your dealership"}
        </p>
        <p className="location">
          <MapPin size={14} />
          {draft.city || "Your city"}, {draft.state || "NC"}
        </p>
        <p className="mini-headline">
          {draft.headline || "Tell people what makes you their car person."}
        </p>
        <div className="tag-row">
          {(splitTags(draft.specialties).length
            ? splitTags(draft.specialties)
            : ["Your specialty"]
          ).map((s, index) => (
            <span className="tag" key={`${s}-${index}`}>
              {s}
            </span>
          ))}
        </div>
        {detailed ? (
          <>
            <div className="draft-detail">
              <h3>A little about me</h3>
              <p>{draft.bio || "Your introduction will appear here."}</p>
            </div>
            {draft.brands && (
              <div className="draft-detail">
                <h3>Brands I know</h3>
                <p>{splitTags(draft.brands).join(" · ")}</p>
              </div>
            )}
            <div className="draft-detail">
              <h3>Let’s connect</h3>
              {draft.email && (
                <a href={`mailto:${draft.email}`}>
                  <Mail size={17} />
                  {draft.email}
                </a>
              )}
              {draft.phone && (
                <a href={`tel:${draft.phone.replace(/[^+\d]/g, "")}`}>
                  <Phone size={17} />
                  {draft.phone}
                </a>
              )}
              {!draft.email && !draft.phone && (
                <p>Add your email or phone number in the studio.</p>
              )}
            </div>
          </>
        ) : (
          <button className="button button-blue full" type="button" onClick={onPreview}>
            Save & preview <Eye size={17} />
          </button>
        )}
        <div className="mini-link">
          mycarperson.com/{draft.slug || "your-name"}
          <br />
          <small>Proposed address · Not published or reserved</small>
        </div>
      </div>
    </div>
  );
}

export function ProfileStudio() {
  const router = useRouter();
  const [draft, setDraft] = useState<ProfileDraft>(emptyDraft);
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<{ message: string; error?: boolean }>({
    message: "",
  });
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const stored = parseDraft(raw);
        if (stored) {
          setDraft(stored);
          setStatus({ message: "Your saved draft is ready to edit." });
        } else
          setStatus({
            message:
              "The saved draft could not be read. You can start a new one or import a valid backup.",
            error: true,
          });
      }
    } catch {
      setStatus({
        message:
          "Local storage is unavailable. You can still edit and download a draft, but it cannot be saved on this device.",
        error: true,
      });
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update(field: Field, value: string) {
    setDraft((current) => {
      const next = {
        ...current,
        [field]:
          field === "years"
            ? Math.min(70, Math.max(0, Number(value) || 0))
            : field === "state"
              ? value.toUpperCase()
              : value,
      };
      if (
        field === "name" &&
        (!current.slug || current.slug === slugify(current.name))
      )
        next.slug = slugify(value);
      return next;
    });
    setDirty(true);
    setStatus({ message: "" });
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate(): ProfileDraft | null {
    const result = draftSchema.safeParse(draft);
    if (!result.success) {
      const nextErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as Field;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setStatus({
        message: "Please check the highlighted fields before continuing.",
        error: true,
      });
      document.getElementById(`draft-${Object.keys(nextErrors)[0]}`)?.focus();
      return null;
    }
    setErrors({});
    return result.data;
  }

  function save(preview = false) {
    const valid = validate();
    if (!valid) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(valid));
      setDraft(valid);
      setDirty(false);
      setStatus({
        message:
          "Draft saved on this device. It is not published, and the address is not reserved.",
      });
      if (preview) router.push("/preview");
    } catch {
      setStatus({
        message:
          "Your browser could not save the draft. Download a backup instead, or allow local storage and try again.",
        error: true,
      });
    }
  }

  function exportDraft() {
    const valid = validate();
    if (!valid) return;
    try {
      downloadText(
        JSON.stringify(valid, null, 2),
        `mycarperson-${valid.slug}.json`,
        "application/json",
      );
      setStatus({
        message:
          "Draft backup downloaded. Import it to continue on another device.",
      });
    } catch {
      setStatus({
        message:
          "Download failed. Your changes are still in the editor; please try again.",
        error: true,
      });
    }
  }

  async function importDraft(file: File | undefined) {
    if (!file) return;
    if (file.size > 100_000) {
      setStatus({
        message:
          "That file is too large. Choose a MyCarPerson draft smaller than 100 KB.",
        error: true,
      });
      return;
    }
    try {
      const data = parseDraft(await file.text());
      if (!data) {
        setStatus({
          message:
            "That file is not a valid MyCarPerson draft. Your current draft hasn't changed.",
          error: true,
        });
        return;
      }
      setDraft(data);
      setErrors({});
      setDirty(true);
      setStatus({
        message:
          "Draft imported into the editor. Save it to keep it on this device.",
      });
    } catch {
      setStatus({
        message:
          "We couldn't read that file. Please choose another draft backup.",
        error: true,
      });
    }
  }

  const completed = [
    draft.name.length >= 2,
    draft.slug.length >= 3,
    draft.dealership.length >= 2,
    draft.city.length >= 2,
    draft.headline.length >= 5,
    draft.bio.length > 0,
    Boolean(draft.email || draft.phone),
  ].filter(Boolean).length;
  const textProps = { draft, update };
  if (!ready)
    return (
      <div className="page-width inner-page">
        <p className="loading-text" role="status">
          Opening your profile studio…
        </p>
      </div>
    );
  return (
    <div className="page-width inner-page">
      <div className="page-heading">
        <span className="eyebrow">PROFILE STUDIO</span>
        <h1>Put your name on it.</h1>
        <p>
          Tell your story. Show what you know. Make it easy for people to find
          their car person.
        </p>
      </div>
      <PreviewNote>
        You’re creating a local draft. Accounts and public publishing are not
        available yet; your details are not sent to a server.
      </PreviewNote>
      <div className="studio-shell">
        <form
          className="studio-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <section className="studio-section">
            <div className="section-title">
              <span className="section-number">01</span>
              <h2>The introduction</h2>
            </div>
            <div className="form-grid">
              <TextField
                {...textProps}
                field="name"
                label="Full name"
                placeholder="Your first and last name"
                maxLength={80}
                error={errors.name}
                required
              />
              <div className="form-field">
                <label htmlFor="draft-role">Your role *</label>
                <select
                  id="draft-role"
                  value={draft.role}
                  onChange={(e) => update("role", e.target.value)}
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="wide form-field">
                <label htmlFor="draft-slug">Your profile address *</label>
                <div className="address-field">
                  <span>mycarperson.com/</span>
                  <input
                    id="draft-slug"
                    value={draft.slug}
                    maxLength={50}
                    onChange={(e) =>
                      update("slug", e.target.value.toLowerCase())
                    }
                    placeholder="your-name"
                    autoCapitalize="none"
                    spellCheck={false}
                    aria-invalid={Boolean(errors.slug)}
                    aria-describedby={errors.slug ? "slug-error" : "slug-hint"}
                  />
                </div>
                {errors.slug && (
                  <span className="field-error" id="slug-error">
                    {errors.slug}
                  </span>
                )}
                <span className="field-hint" id="slug-hint">
                  A proposed address for now. Saving a draft does not reserve
                  it.
                </span>
              </div>
              <div className="wide">
                <TextField
                  {...textProps}
                  field="headline"
                  label="Your one-line introduction"
                  maxLength={120}
                  placeholder="Your next car. Your pace. Your person."
                  error={errors.headline}
                  required
                />
              </div>
            </div>
            <fieldset className="color-picker">
              <legend>Your profile color</legend>
              {["blue", "green", "violet", "orange", "teal", "rose"].map(
                (color) => (
                  <button
                    key={color}
                    type="button"
                    className={`color-swatch color-${color}`}
                    aria-label={`${color} profile color`}
                    aria-pressed={draft.color === color}
                    onClick={() => update("color", color)}
                  >
                    {draft.color === color && <Check size={18} />}
                  </button>
                ),
              )}
            </fieldset>
          </section>
          <section className="studio-section">
            <div className="section-title">
              <span className="section-number">02</span>
              <h2>Your world of automotive</h2>
            </div>
            <TextField
              {...textProps}
              field="dealership"
              label="Current dealership or workplace"
              maxLength={100}
              placeholder="Where you work today"
              error={errors.dealership}
              required
            />
            <div className="form-grid">
              <TextField
                {...textProps}
                field="city"
                label="City"
                maxLength={80}
                placeholder="New Bern"
                error={errors.city}
                required
              />
              <TextField
                {...textProps}
                field="state"
                label="State"
                maxLength={2}
                placeholder="NC"
                error={errors.state}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="draft-bio">A little about you</label>
              <textarea
                id="draft-bio"
                value={draft.bio}
                maxLength={1500}
                rows={5}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="What do you love about helping people? What can customers expect when they work with you?"
              />
              <span className="field-hint">
                {draft.bio.length}/1,500 characters
              </span>
            </div>
            <TextField
              {...textProps}
              field="specialties"
              label="Your specialties"
              maxLength={250}
              placeholder="First-time buyers, Electric vehicles, Trade-ins"
              hint="Separate each specialty with a comma. Up to 8 will appear."
            />
            <div className="form-grid">
              <TextField
                {...textProps}
                field="brands"
                label="Brands you know"
                maxLength={250}
                placeholder="Kia, Mazda, Toyota"
                hint="Separate brands with commas."
              />
              <TextField
                {...textProps}
                field="years"
                label="Years in automotive"
                type="number"
                error={errors.years}
              />
            </div>
          </section>
          <section className="studio-section">
            <div className="section-title">
              <span className="section-number">03</span>
              <h2>Make the connection</h2>
            </div>
            <p className="dialog-intro">
              The contact details you’d like customers to see on your future
              public profile. Both fields are optional.
            </p>
            <div className="form-grid">
              <TextField
                {...textProps}
                field="email"
                label="Contact email"
                type="email"
                maxLength={254}
                placeholder="you@yourdealership.com"
                error={errors.email}
              />
              <TextField
                {...textProps}
                field="phone"
                label="Contact phone"
                type="tel"
                maxLength={30}
                placeholder="(252) 555-0100"
                error={errors.phone}
              />
            </div>
          </section>
          <div className="studio-actions">
            <button className="button button-blue" type="submit">
              <Save size={17} />
              Save my draft
            </button>
            <button
              className="button button-outline"
              type="button"
              onClick={() => save(true)}
            >
              Save & preview <ArrowRight size={17} />
            </button>
          </div>
          <p className="studio-bottom-note">
            {dirty
              ? "You have unsaved changes. Save before leaving this page."
              : "Saved drafts stay in this browser. Download a backup to move to another device."}
          </p>
          {status.message && (
            <div
              className={`notice ${status.error ? "error" : "success"}`}
              role={status.error ? "alert" : "status"}
            >
              {status.message}
            </div>
          )}
          <div className="draft-tools">
            <button type="button" onClick={exportDraft}>
              <Download size={15} />
              Download backup
            </button>
            <button type="button" onClick={() => importRef.current?.click()}>
              <Upload size={15} />
              Import backup
            </button>
            <input
              className="sr-only"
              type="file"
              ref={importRef}
              accept="application/json,.json"
              aria-label="Import a MyCarPerson draft backup"
              onChange={(e) => {
                void importDraft(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>
        </form>
        <aside className="studio-preview">
          <div className="preview-heading">
            <span>Your profile, coming together.</span>
            <span>LOCAL DRAFT</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Profile details completed"
            aria-valuemin={0}
            aria-valuemax={7}
            aria-valuenow={completed}
          >
            <div style={{ width: `${(completed / 7) * 100}%` }} />
          </div>
          <p className="completion-note">
            {completed} of 7 profile details added
          </p>
          <MiniProfile draft={draft} onPreview={() => save(true)} />
          <p className="studio-preview-note">
            <Fingerprint size={19} />
            Your profile is about you. Your workplace is one chapter in the
            story.
          </p>
          <div className="draft-tools">
            <Dialog
              title="Clear your local draft?"
              trigger={
                <>
                  <Trash2 size={14} />
                  Clear draft
                </>
              }
              buttonClass="text-link"
            >
              <p className="dialog-intro">
                This removes the draft saved in this browser and clears the
                editor. Download a backup first if you want to keep it.
              </p>
              <button
                className="button button-dark full"
                onClick={(e) => {
                  try {
                    localStorage.removeItem(DRAFT_KEY);
                    setDraft(emptyDraft);
                    setErrors({});
                    setDirty(false);
                    setStatus({
                      message: "Your local draft has been cleared.",
                    });
                    e.currentTarget.closest("dialog")?.close();
                  } catch {
                    setStatus({
                      message:
                        "The draft could not be cleared. Please try again.",
                      error: true,
                    });
                    e.currentTarget.closest("dialog")?.close();
                  }
                }}
              >
                Clear this device’s draft
              </button>
            </Dialog>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function DraftPreview() {
  const [draft, setDraft] = useState<ProfileDraft | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setDraft(parseDraft(raw));
    } catch {
      /* The empty state offers a route back to the studio. */
    }
    setReady(true);
  }, []);
  if (!ready)
    return (
      <div className="page-width inner-page">
        <p className="loading-text" role="status">
          Loading your saved draft…
        </p>
      </div>
    );
  return (
    <div className="page-width inner-page">
      <div className="breadcrumbs">
        <Link href="/studio">Profile studio</Link>
        <ChevronRight size={13} />
        <span>Draft preview</span>
      </div>
      <div className="draft-preview-page">
        <div className="page-heading">
          <span className="eyebrow">THIS IS YOUR INTRODUCTION</span>
          <h1>
            {draft
              ? "Looking like your kind of profile."
              : "Let’s put a name to this profile."}
          </h1>
        </div>
        <PreviewNote>
          This preview is only on your device. It is not a published profile,
          and sharing this page will not share your draft.
        </PreviewNote>
        {draft ? (
          <>
            <MiniProfile draft={draft} detailed />
            <div
              className="studio-actions"
              style={{ justifyContent: "center" }}
            >
              <Link className="button button-blue" href="/studio">
                Keep editing <ArrowRight size={17} />
              </Link>
              <button
                className="button button-outline"
                onClick={() =>
                  downloadText(
                    makeVCard(draft),
                    `${draft.slug}.vcf`,
                    "text/vcard;charset=utf-8",
                  )
                }
              >
                <Download size={17} />
                Download my contact card
              </button>
            </div>
          </>
        ) : (
          <div className="empty-state" style={{ marginTop: 25 }}>
            <Fingerprint size={35} />
            <h2>No saved draft on this device.</h2>
            <p>
              Create and save your draft in the profile studio, or import a
              backup to continue.
            </p>
            <Link className="button button-blue" href="/studio">
              Open profile studio <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
