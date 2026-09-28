"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { HalomotButton } from "./HalomotButton";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  link?: string;
};

type ProjectShowcaseProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: { name?: string; position?: string; testimony?: string };
  fontSizes?: { name?: string; position?: string; testimony?: string };
  desktopVersionBottomThreshold?: number;
  imageAspectRatio?: number;
  onItemClick?: (link: string) => void;
  outerRounding?: string;
  innerRounding?: string;
  outlineColor?: string;
  hoverOutlineColor?: string;
  buttonInscriptions?: {
    previousButton: string;
    nextButton: string;
    openWebAppButton: string;
  };
  halomotButtonGradient?: string;
  halomotButtonBackground?: string;
  halomotButtonTextColor?: string;
  halomotButtonOuterBorderRadius?: string;
  halomotButtonInnerBorderRadius?: string;
  halomotButtonHoverTextColor?: string;
};

export const ProjectShowcase = ({
  testimonials,
  autoplay = false,
  colors = { name: "#221913", position: "#8A6F58", testimony: "#3A2A20" },
  fontSizes = { name: "1.9rem", position: "0.85rem", testimony: "1.15rem" },
  desktopVersionBottomThreshold = 1024,
  imageAspectRatio = 1.2,
  onItemClick,
  outerRounding = "24px",
  innerRounding = "23px",
  outlineColor = "#E7D8C2",
  hoverOutlineColor = "#C0912F",
  buttonInscriptions = {
    previousButton: "Previous",
    nextButton: "Next",
    openWebAppButton: "Read on Google",
  },
  halomotButtonGradient = "linear-gradient(to right, #B23A1E, #E0902B)",
  halomotButtonBackground = "#FBF6EC",
  halomotButtonTextColor = "#221913",
  halomotButtonOuterBorderRadius = "999px",
  halomotButtonInnerBorderRadius = "999px",
  halomotButtonHoverTextColor = "#FBF6EC",
}: ProjectShowcaseProps) => {
  const [active, setActive] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [componentWidth, setComponentWidth] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const handleResize = useCallback(() => {
    if (componentRef.current) {
      setComponentWidth(componentRef.current.offsetWidth);
      setIsMobileView(componentRef.current.offsetWidth < desktopVersionBottomThreshold);
    }
  }, [desktopVersionBottomThreshold]);

  useEffect(() => {
    const el = componentRef.current;
    const resizeObserver = new ResizeObserver(handleResize);
    if (el) resizeObserver.observe(el);
    handleResize();
    return () => {
      if (el) resizeObserver.unobserve(el);
    };
  }, [handleResize]);

  // Deterministic tilt per card so server and client markup match (no hydration mismatch).
  const rotateFor = (index: number) => {
    const seq = [-6, 5, -4, 6, -5, 4, -3];
    return seq[index % seq.length];
  };

  const calculateGap = (width: number) => {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 48;
    const maxGap = 72;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth) return maxGap;
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
  };

  return (
    <div ref={componentRef} className="w-full mx-auto font-sans antialiased">
      <div
        className="relative"
        style={{
          display: "grid",
          gridTemplateColumns: isMobileView ? "1fr" : "1fr 1fr",
          gap: `${calculateGap(componentWidth)}px`,
          alignItems: "center",
        }}
      >
        {/* Image stack */}
        <div className="w-full">
          <div className="relative" style={{ paddingTop: `${(1 / imageAspectRatio) * 100}%` }}>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, z: -100, rotate: rotateFor(index) }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.65,
                    scale: isActive(index) ? 1 : 0.94,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotateFor(index),
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -60, 0] : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.9, z: 100, rotate: rotateFor(index) }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div
                    className="relative h-full w-full"
                    style={{
                      borderRadius: outerRounding,
                      padding: "1.5px",
                      backgroundColor: isActive(index) ? hoverOutlineColor : outlineColor,
                      transition: "background-color 0.3s ease-in-out",
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: innerRounding }}>
                      <Image
                        src={testimonial.src}
                        alt={testimonial.name}
                        fill
                        draggable={false}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-between py-4 w-full">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <h3 className="font-display" style={{ fontSize: fontSizes.name, color: colors.name, fontWeight: 600, marginBottom: "0.35em" }}>
              {testimonials[active].name}
            </h3>
            <p style={{ fontSize: fontSizes.position, color: colors.position, textTransform: "uppercase", letterSpacing: "0.16em", marginBottom: "1.25em" }}>
              {testimonials[active].designation}
            </p>
            <motion.p style={{ fontSize: fontSizes.testimony, color: colors.testimony, lineHeight: 1.6 }}>
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(8px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.015 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className={`flex gap-3 ${isMobileView ? "pt-10" : "pt-8"} w-full flex-wrap`}>
            <HalomotButton
              inscription={buttonInscriptions.previousButton}
              onClick={handlePrev}
              fixedWidth="150px"
              gradient={halomotButtonGradient}
              backgroundColor={halomotButtonBackground}
              textColor={halomotButtonTextColor}
              innerBorderRadius={halomotButtonInnerBorderRadius}
              outerBorderRadius={halomotButtonOuterBorderRadius}
              hoverTextColor={halomotButtonHoverTextColor}
            />
            <HalomotButton
              inscription={buttonInscriptions.nextButton}
              onClick={handleNext}
              fixedWidth="150px"
              gradient={halomotButtonGradient}
              backgroundColor={halomotButtonBackground}
              textColor={halomotButtonTextColor}
              innerBorderRadius={halomotButtonInnerBorderRadius}
              outerBorderRadius={halomotButtonOuterBorderRadius}
              hoverTextColor={halomotButtonHoverTextColor}
            />
            <HalomotButton
              inscription={buttonInscriptions.openWebAppButton}
              onClick={() => onItemClick && onItemClick(testimonials[active].link || "")}
              fillWidth
              gradient={halomotButtonGradient}
              backgroundColor={halomotButtonBackground}
              textColor={halomotButtonTextColor}
              innerBorderRadius={halomotButtonInnerBorderRadius}
              outerBorderRadius={halomotButtonOuterBorderRadius}
              hoverTextColor={halomotButtonHoverTextColor}
              href={testimonials[active].link}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
