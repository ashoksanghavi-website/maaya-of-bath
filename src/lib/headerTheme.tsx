"use client";

import { createContext, useContext, useEffect, useState } from "react";

// "light" means the area behind the header at the top of the page is light
// (so the header uses dark text). "dark" means a dark hero sits behind it
// (so the header uses cream text until the user scrolls).
type Tone = "light" | "dark";

const HeaderToneContext = createContext<{
  tone: Tone;
  setTone: (t: Tone) => void;
}>({ tone: "light", setTone: () => {} });

export function HeaderToneProvider({ children }: { children: React.ReactNode }) {
  const [tone, setTone] = useState<Tone>("light");
  return (
    <HeaderToneContext.Provider value={{ tone, setTone }}>
      {children}
    </HeaderToneContext.Provider>
  );
}

export function useHeaderTone() {
  return useContext(HeaderToneContext).tone;
}

// Dropped into a page (or PageHero) to declare its top-of-page tone.
export function SetHeaderTone({ tone }: { tone: Tone }) {
  const { setTone } = useContext(HeaderToneContext);
  useEffect(() => {
    setTone(tone);
    return () => setTone("light");
  }, [tone, setTone]);
  return null;
}
