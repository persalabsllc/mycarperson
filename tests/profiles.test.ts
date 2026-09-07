import test from "node:test";
import assert from "node:assert/strict";
import {
  profiles,
  findProfiles,
  averageRating,
  initials,
} from "../src/lib/profiles";
import {
  draftSchema,
  emptyDraft,
  parseDraft,
  slugify,
  makeVCard,
} from "../src/lib/draft";

const valid = {
  ...emptyDraft,
  name: "Test Person",
  slug: "test-person",
  city: "New Bern",
  dealership: "Test Auto",
  headline: "Your person for the road ahead.",
};

test("directory search combines location, role, brand, and case-insensitive text", () => {
  assert.equal(
    findProfiles(" KIA ", "NEW BERN", "Sales consultant")[0]?.slug,
    "alex-morgan",
  );
  assert.equal(findProfiles("", "Raleigh", "Technician").length, 0);
  assert.equal(findProfiles("does not exist", "", "All people").length, 0);
  assert.equal(findProfiles("", "", "All people").length, 6);
  assert.equal(findProfiles("hybrid", "", "All people").length, 2);
});
test("sorting is deterministic and does not mutate seed records", () => {
  const before = profiles.map((p) => p.slug);
  assert.equal(
    findProfiles("", "", "All people", "experience")[0].slug,
    "avery-james",
  );
  assert.equal(
    findProfiles("", "", "All people", "reviews")[0].slug,
    "alex-morgan",
  );
  assert.deepEqual(
    profiles.map((p) => p.slug),
    before,
  );
});
test("review display derives counts and averages from actual sample records", () => {
  assert.equal(averageRating(profiles[0].reviews), "4.7");
  assert.equal(averageRating([]), null);
  assert.equal(initials("  Kyle  Kratoville  "), "KK");
  assert.equal(initials(""), "YOU");
});
test("draft validator accepts a valid record and rejects reserved or malformed handles", () => {
  assert.equal(draftSchema.safeParse(valid).success, true);
  for (const slug of [
    "admin",
    "studio",
    "alex-morgan",
    "a",
    "ab--cd",
    "-abc",
    "abc-",
    "bad/name",
    "<script>",
  ])
    assert.equal(
      draftSchema.safeParse({ ...valid, slug }).success,
      false,
      slug,
    );
  assert.equal(
    draftSchema.safeParse({ ...valid, email: "not-an-email" }).success,
    false,
  );
  assert.equal(
    draftSchema.safeParse({ ...valid, phone: "javascript:alert(1)" }).success,
    false,
  );
  assert.equal(
    draftSchema.safeParse({ ...valid, state: "NCC" }).success,
    false,
  );
  assert.equal(draftSchema.safeParse({ ...valid, years: 1.5 }).success, false);
});
test("import rejects corrupt drafts and strips unexpected fields", () => {
  assert.equal(parseDraft("not json"), null);
  assert.equal(parseDraft("[]"), null);
  assert.equal(parseDraft(JSON.stringify({ ...valid, version: 99 })), null);
  assert.deepEqual(
    parseDraft(JSON.stringify({ ...valid, admin: true })),
    valid,
  );
  assert.equal(slugify("José García!"), "jose-garcia");
});
test("vCard escapes control characters and does not invent a draft public URL", () => {
  const card = makeVCard({
    name: "Test\nPerson",
    dealership: "Test;Auto, LLC",
    role: "Sales consultant",
    phone: "",
    email: "test@example.com",
  });
  assert.match(card, /FN:Test\\nPerson/);
  assert.match(card, /ORG:Test\\;Auto\\, LLC/);
  assert.equal(card.includes("\r\nURL:"), false);
  assert.equal(card.includes("\r\nTEL;"), false);
  assert.ok(card.endsWith("END:VCARD\r\n"));
});
