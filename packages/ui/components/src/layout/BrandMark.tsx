import React from "react";
import { cn } from "@kwasu-portal/utils-others";

interface BrandMarkProps {
  logoOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  src?: string;
  alt?: string;
}

const sizeConfig = {
  sm: { image: "40px", title: "12px", tagline: "7px" },
  md: { image: "48px", title: "15px", tagline: "9px" },
  lg: { image: "60px", title: "20px", tagline: "10px" },
};

export function BrandMark({
  logoOnly = false,
  size = "md",
  className,
  src = "/kwasu-logo.png",
  alt = "Kwara State University logo",
}: BrandMarkProps) {
  const sizes = sizeConfig[size];

  if (logoOnly) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("object-contain rounded-lg", className)}
        style={{ height: sizes.image, width: sizes.image }}
      />
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={src}
        alt={alt}
        className={cn("object-contain rounded-lg flex-shrink-0")}
        style={{ height: sizes.image, width: sizes.image }}
      />
      <div className="min-w-0">
        <div
          className={cn("font-serif font-semibold leading-tight truncate")}
          style={{ letterSpacing: 0.3, fontSize: sizes.title }}
        >
          Kwara State University
        </div>
        <div
          className={cn(
            "font-sans font-bold text-gold-500 tracking-[0.2em] uppercase",
          )}
          style={{ fontSize: sizes.tagline }}
        >
          The Green University
        </div>
      </div>
    </div>
  );
}
