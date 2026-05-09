"use client";
import { Badge } from "@kwasu-portal/components";
import Image from "next/image";
import { useState } from "react";

export function UserPhoto({
  src,
  alt,
  bg,
  badge,
}: {
  src?: string;
  alt: string;
  bg?: string;
  badge?: string;
}) {
  const [error, setError] = useState(false);

  return (
    <div
      className="relative aspect-square overflow-hidden"
      style={{ background: error || !src ? bg : undefined }}
    >
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/placeholders/user-placeholder.png"
            alt="Placeholder"
            width={800}
            height={800}
            className="w-full h-full object-contain opacity-50"
          />
        </div>
      )}
      {badge && (
        <Badge
          className="absolute bottom-2.5 left-2.5 border-0 rounded"
          variant="primary"
          size="sm"
        >
          {badge}
        </Badge>
      )}
    </div>
  );
}
