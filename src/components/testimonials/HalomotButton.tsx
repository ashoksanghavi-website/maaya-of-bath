"use client";

import { useState } from "react";

type HalomotButtonProps = {
  gradient?: string;
  inscription: string;
  onClick?: () => void;
  fillWidth?: boolean;
  fixedWidth?: string;
  href?: string;
  backgroundColor?: string;
  textColor?: string;
  innerBorderRadius?: string;
  outerBorderRadius?: string;
  hoverTextColor?: string;
};

export const HalomotButton = ({
  gradient = "linear-gradient(to right, #B23A1E, #E0902B)",
  inscription,
  onClick,
  fillWidth = false,
  fixedWidth,
  href,
  backgroundColor = "#FBF6EC",
  textColor = "#221913",
  innerBorderRadius = "6px",
  outerBorderRadius = "6.34px",
  hoverTextColor,
}: HalomotButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle: React.CSSProperties = fillWidth
    ? { width: "100%", display: "flex" }
    : fixedWidth
    ? { width: fixedWidth, display: "inline-flex" }
    : { display: "inline-flex" };

  const outerStyle: React.CSSProperties = {
    margin: fillWidth ? "0" : "auto",
    padding: "1px",
    background: gradient,
    borderRadius: outerBorderRadius,
    width: fillWidth ? "100%" : fixedWidth ? "100%" : "auto",
    boxShadow: isHovered
      ? "0 10px 30px -12px rgba(178, 58, 30, 0.5)"
      : "none",
    transition: "box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const innerStyle: React.CSSProperties = {
    display: "block",
    borderRadius: innerBorderRadius,
    color: isHovered ? hoverTextColor ?? textColor : textColor,
    background: isHovered ? "transparent" : backgroundColor,
    fontSize: "0.78rem",
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    padding: "0.95rem 1.5rem",
    width: "100%",
    textAlign: "center",
    transition: "background 0.3s ease, color 0.3s ease",
    whiteSpace: "nowrap",
  };

  const content = <span style={innerStyle}>{inscription}</span>;

  const handleClick = () => {
    if (onClick) onClick();
  };

  if (href) {
    return (
      <span style={containerStyle}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...outerStyle, textDecoration: "none", display: "block" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          {content}
        </a>
      </span>
    );
  }

  return (
    <span style={containerStyle}>
      <button
        type="button"
        style={{ ...outerStyle, border: "none", display: "block" }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </button>
    </span>
  );
};

export default HalomotButton;
