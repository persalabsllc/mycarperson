export const roles = [
  "Sales consultant",
  "Sales manager",
  "Service advisor",
  "Finance manager",
  "Technician",
] as const;
export type Role = (typeof roles)[number];

export type Review = {
  name: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  experience: string;
};
export type Profile = {
  slug: string;
  name: string;
  role: Role;
  dealership: string;
  city: string;
  state: string;
  headline: string;
  bio: string;
  specialties: string[];
  brands: string[];
  languages: string[];
  years: number;
  color: "blue" | "green" | "violet" | "orange" | "teal" | "rose";
  email: string;
  phone: string;
  reviews: Review[];
  experience: { title: string; company: string; dates: string }[];
};

// Deliberately fictional seed data. Never use these as real testimonials or verified members.
export const profiles: Profile[] = [
  {
    slug: "alex-morgan",
    name: "Alex Morgan",
    role: "Sales consultant",
    dealership: "Coastal Auto Collective",
    city: "New Bern",
    state: "NC",
    headline: "Your next car. Your pace. Your person.",
    bio: "Buying a car should feel like a conversation, not a negotiation marathon. I help drivers connect the dots between what they need, what they love, and what fits their budget. First-time buyer or fifth family SUV, you can expect clear answers and someone in your corner long after you get the keys.",
    specialties: ["First-time buyers", "SUVs & crossovers", "Trade-ins"],
    brands: ["Kia", "Hyundai", "Toyota"],
    languages: ["English"],
    years: 8,
    color: "blue",
    email: "alex@example.com",
    phone: "252-555-0101",
    reviews: [
      {
        name: "Jamie R.",
        date: "2026-08-22",
        rating: 5,
        title: "Finally, someone who listened.",
        body: "I came in with a budget and a long list of questions. Alex explained everything, helped me compare my options, and never made me feel rushed. Exactly the kind of experience I was hoping for.",
        experience: "Purchased a vehicle",
      },
      {
        name: "Taylor M.",
        date: "2026-07-14",
        rating: 5,
        title: "Still my go-to after the sale.",
        body: "The best part was the follow-up. When I had a question about my new car a week later, Alex was just as helpful as before I bought it.",
        experience: "Purchased a vehicle",
      },
      {
        name: "Casey D.",
        date: "2026-06-05",
        rating: 4,
        title: "A refreshingly straightforward trade-in.",
        body: "We talked through the numbers and the trade-in process without any runaround. The paperwork took a little longer than expected, but the communication was great.",
        experience: "Traded a vehicle",
      },
    ],
    experience: [
      {
        title: "Sales consultant",
        company: "Coastal Auto Collective",
        dates: "2022 – Present",
      },
      {
        title: "Sales consultant",
        company: "Harbor Automotive",
        dates: "2018 – 2022",
      },
    ],
  },
  {
    slug: "jordan-ellis",
    name: "Jordan Ellis",
    role: "Service advisor",
    dealership: "Oakline Service Center",
    city: "Raleigh",
    state: "NC",
    headline: "Car care, without the guesswork.",
    bio: "I turn technical car problems into clear, practical next steps. My job is to help you understand what your vehicle needs today, what can wait, and how to keep it running for the long haul.",
    specialties: [
      "Maintenance planning",
      "Warranty questions",
      "Hybrid vehicles",
    ],
    brands: ["Toyota", "Lexus"],
    languages: ["English", "Spanish"],
    years: 11,
    color: "green",
    email: "jordan@example.com",
    phone: "919-555-0102",
    reviews: [
      {
        name: "Morgan P.",
        date: "2026-08-12",
        rating: 5,
        title: "Explained what actually mattered.",
        body: "Jordan walked me through the inspection and helped me prioritize the repairs. I left knowing exactly what was done and why.",
        experience: "Serviced a vehicle",
      },
    ],
    experience: [
      {
        title: "Senior service advisor",
        company: "Oakline Service Center",
        dates: "2020 – Present",
      },
      {
        title: "Service advisor",
        company: "Pine Street Auto",
        dates: "2015 – 2020",
      },
    ],
  },
  {
    slug: "sam-rivera",
    name: "Sam Rivera",
    role: "Finance manager",
    dealership: "Pinecrest Motors",
    city: "Wilmington",
    state: "NC",
    headline: "Clear numbers. Confident decisions.",
    bio: "Car financing comes with enough fine print. I help people understand their options, ask the right questions, and make an informed decision that works for their situation.",
    specialties: ["Financing options", "First-time buyers", "Leasing"],
    brands: ["Ford", "Lincoln"],
    languages: ["English", "Spanish"],
    years: 9,
    color: "violet",
    email: "sam@example.com",
    phone: "910-555-0103",
    reviews: [
      {
        name: "Riley B.",
        date: "2026-08-03",
        rating: 5,
        title: "No unanswered questions.",
        body: "Sam took the time to explain the documents and compare my options. It made the last part of buying a car much less stressful.",
        experience: "Financed a vehicle",
      },
    ],
    experience: [
      {
        title: "Finance manager",
        company: "Pinecrest Motors",
        dates: "2021 – Present",
      },
      {
        title: "Sales consultant",
        company: "Pinecrest Motors",
        dates: "2017 – 2021",
      },
    ],
  },
  {
    slug: "morgan-brooks",
    name: "Morgan Brooks",
    role: "Sales consultant",
    dealership: "Blue Ridge Auto House",
    city: "Charlotte",
    state: "NC",
    headline: "An electric future. A human connection.",
    bio: "Curious about going electric? I help drivers make sense of charging, range, and the everyday details of EV ownership. Let's find the right fit for the way you actually drive.",
    specialties: ["Electric vehicles", "Luxury vehicles", "Leasing"],
    brands: ["BMW", "MINI"],
    languages: ["English"],
    years: 6,
    color: "orange",
    email: "morgan@example.com",
    phone: "704-555-0104",
    reviews: [
      {
        name: "Drew S.",
        date: "2026-07-29",
        rating: 5,
        title: "Made the switch feel easy.",
        body: "Morgan answered all my charging questions and helped me understand what EV ownership would look like at home. Such a helpful conversation.",
        experience: "Purchased a vehicle",
      },
    ],
    experience: [
      {
        title: "EV sales specialist",
        company: "Blue Ridge Auto House",
        dates: "2023 – Present",
      },
      {
        title: "Sales consultant",
        company: "Cityline Auto",
        dates: "2020 – 2023",
      },
    ],
  },
  {
    slug: "riley-chen",
    name: "Riley Chen",
    role: "Technician",
    dealership: "Precision Coast Garage",
    city: "Greenville",
    state: "NC",
    headline: "Details matter. Especially under the hood.",
    bio: "I enjoy the problem-solving side of automotive work: tracking down the root cause, doing the repair right, and helping people feel confident in their vehicle again.",
    specialties: ["Diagnostics", "Hybrid vehicles", "Preventive maintenance"],
    brands: ["Honda", "Acura", "Toyota"],
    languages: ["English", "Mandarin"],
    years: 12,
    color: "teal",
    email: "riley@example.com",
    phone: "252-555-0105",
    reviews: [
      {
        name: "Avery W.",
        date: "2026-08-09",
        rating: 5,
        title: "Found the problem others missed.",
        body: "Riley explained the diagnosis clearly and showed me what needed attention. I appreciated the detail and the straightforward approach.",
        experience: "Serviced a vehicle",
      },
    ],
    experience: [
      {
        title: "Lead technician",
        company: "Precision Coast Garage",
        dates: "2019 – Present",
      },
      {
        title: "Automotive technician",
        company: "Eastside Auto Works",
        dates: "2014 – 2019",
      },
    ],
  },
  {
    slug: "avery-james",
    name: "Avery James",
    role: "Sales manager",
    dealership: "Soundside Automotive",
    city: "Kinston",
    state: "NC",
    headline: "Good people. Better car-buying experiences.",
    bio: "I believe the best dealerships are built around people who care. I work with customers and our team to make every step of the car-buying process straightforward and personal.",
    specialties: ["Team leadership", "Trade-ins", "Pre-owned vehicles"],
    brands: ["Kia", "Mazda", "Nissan"],
    languages: ["English"],
    years: 14,
    color: "rose",
    email: "avery@example.com",
    phone: "252-555-0106",
    reviews: [
      {
        name: "Parker L.",
        date: "2026-08-17",
        rating: 5,
        title: "A team that really cared.",
        body: "Avery helped us work through our options and made sure we were comfortable with the decision. The whole team was easy to work with.",
        experience: "Purchased a vehicle",
      },
    ],
    experience: [
      {
        title: "Sales manager",
        company: "Soundside Automotive",
        dates: "2021 – Present",
      },
      {
        title: "Sales consultant",
        company: "Soundside Automotive",
        dates: "2012 – 2021",
      },
    ],
  },
];

export function initials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] ?? "")
      .join("")
      .toUpperCase() || "YOU"
  );
}
export function averageRating(reviews: Review[]) {
  return reviews.length
    ? (
        reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
      ).toFixed(1)
    : null;
}
export function findProfiles(
  query: string,
  location: string,
  role: string,
  sort = "name",
) {
  const q = query.trim().toLocaleLowerCase();
  const place = location.trim().toLocaleLowerCase();
  const result = profiles.filter(
    (p) =>
      (!q ||
        [p.name, p.dealership, p.role, ...p.brands, ...p.specialties]
          .join(" ")
          .toLocaleLowerCase()
          .includes(q)) &&
      (!place || `${p.city} ${p.state}`.toLocaleLowerCase().includes(place)) &&
      (role === "All people" || p.role === role),
  );
  return result.sort((a, b) =>
    sort === "experience"
      ? b.years - a.years
      : sort === "reviews"
        ? b.reviews.length - a.reviews.length
        : a.name.localeCompare(b.name),
  );
}
