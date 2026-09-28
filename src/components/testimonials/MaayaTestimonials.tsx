"use client";

import { ProjectShowcase } from "./ProjectShowcase";
import { testimonials } from "@/data/content";

function openInNewTab(link: string) {
  if (link) window.open(link, "_blank", "noopener,noreferrer");
}

export function MaayaTestimonials() {
  return (
    <ProjectShowcase
      testimonials={testimonials}
      autoplay
      colors={{ name: "#221913", position: "#8A6F58", testimony: "#3A2A20" }}
      fontSizes={{ name: "2rem", position: "0.78rem", testimony: "1.2rem" }}
      imageAspectRatio={1.15}
      outlineColor="#E7D8C2"
      hoverOutlineColor="#C0912F"
      buttonInscriptions={{
        previousButton: "Previous",
        nextButton: "Next",
        openWebAppButton: "Read on Google",
      }}
      halomotButtonGradient="linear-gradient(to right, #B23A1E, #E0902B)"
      halomotButtonBackground="#FBF6EC"
      halomotButtonTextColor="#221913"
      halomotButtonHoverTextColor="#FBF6EC"
      onItemClick={openInNewTab}
    />
  );
}
