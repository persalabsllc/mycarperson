import { z } from "zod";
import { roles } from "./profiles";

export const DRAFT_KEY = "mycarperson.profile-draft.v1";
export const SAVED_KEY = "mycarperson.saved.v1";
export const reservedSlugs = new Set([
  "api",
  "admin",
  "studio",
  "preview",
  "saved",
  "for-professionals",
  "join",
  "login",
  "sign-in",
  "sign-up",
  "settings",
  "support",
  "privacy",
  "terms",
  "robots",
  "sitemap",
  "alex-morgan",
  "jordan-ellis",
  "sam-rivera",
  "morgan-brooks",
  "riley-chen",
  "avery-james",
]);
export const draftSchema = z.object({
  version: z.literal(1),
  name: z.string().trim().min(2, "Enter your full name.").max(80),
  slug: z
    .string()
    .trim()
    .min(3, "Use at least 3 characters.")
    .max(50)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Use lowercase letters, numbers, and single hyphens.",
    )
    .refine(
      (s) => !reservedSlugs.has(s),
      "This address is reserved. Try another.",
    ),
  role: z.enum(roles),
  dealership: z.string().trim().min(2, "Enter your workplace.").max(100),
  city: z.string().trim().min(2, "Enter your city.").max(80),
  state: z
    .string()
    .trim()
    .regex(/^[A-Z]{2}$/, "Use a two-letter state abbreviation."),
  headline: z.string().trim().min(5, "Add a short introduction.").max(120),
  bio: z.string().trim().max(1500),
  email: z.union([z.literal(""), z.email().max(254)]),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine(
      (s) =>
        !s || (/^[+()\d .-]+$/.test(s) && s.replace(/\D/g, "").length >= 10),
      "Enter a valid phone number or leave it blank.",
    ),
  specialties: z.string().trim().max(250),
  brands: z.string().trim().max(250),
  years: z.number().int().min(0).max(70),
  color: z.enum(["blue", "green", "violet", "orange", "teal", "rose"]),
});
export type ProfileDraft = z.infer<typeof draftSchema>;
export const emptyDraft: ProfileDraft = {
  version: 1,
  name: "",
  slug: "",
  role: "Sales consultant",
  dealership: "",
  city: "",
  state: "NC",
  headline: "",
  bio: "",
  email: "",
  phone: "",
  specialties: "",
  brands: "",
  years: 0,
  color: "blue",
};
export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50)
    .replace(/-$/, "");
}
export function splitTags(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
}
export function parseDraft(raw: string): ProfileDraft | null {
  try {
    const result = draftSchema.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}
export function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\n|\r/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}
export function makeVCard(
  profile: {
    name: string;
    role: string;
    dealership: string;
    phone: string;
    email: string;
  },
  url?: string,
) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(profile.name)}`,
    `ORG:${escapeVCard(profile.dealership)}`,
    `TITLE:${escapeVCard(profile.role)}`,
    ...(profile.phone ? [`TEL;TYPE=WORK:${escapeVCard(profile.phone)}`] : []),
    ...(profile.email ? [`EMAIL;TYPE=WORK:${escapeVCard(profile.email)}`] : []),
    ...(url ? [`URL:${escapeVCard(url)}`] : []),
    "END:VCARD",
    "",
  ].join("\r\n");
}
