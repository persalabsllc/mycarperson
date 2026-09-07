"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { SAVED_KEY } from "@/lib/draft";
import { profiles } from "@/lib/profiles";

const Context = createContext<{
  saved: string[];
  ready: boolean;
  toggle: (slug: string) => void;
}>({ saved: [], ready: false, toggle: () => {} });
export function SavedProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const read = () => {
      try {
        const raw: unknown = JSON.parse(
          localStorage.getItem(SAVED_KEY) || "[]",
        );
        if (Array.isArray(raw))
          setSaved(
            raw.filter(
              (v): v is string =>
                typeof v === "string" && profiles.some((p) => p.slug === v),
            ),
          );
      } catch {
        setNotice(
          "Saved people are unavailable in this browser. You can still explore profiles.",
        );
      }
      setReady(true);
    };
    read();
    const onStorage = (event: StorageEvent) => {
      if (event.key === SAVED_KEY) read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  function toggle(slug: string) {
    const next = saved.includes(slug)
      ? saved.filter((item) => item !== slug)
      : [...saved, slug];
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      setSaved(next);
      setNotice("");
    } catch {
      setNotice(
        "Your browser could not save this person. Please allow local storage and try again.",
      );
    }
  }
  return (
    <Context.Provider value={{ saved, ready, toggle }}>
      {children}
      {notice && (
        <div className="storage-notice" role="alert">
          {notice}
          <button aria-label="Dismiss notice" onClick={() => setNotice("")}>
            ×
          </button>
        </div>
      )}
    </Context.Provider>
  );
}
export const useSavedPeople = () => useContext(Context);
