// app/not-found.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandMark, Button } from "@kwasu-portal/components";
import { LuHouse, LuArrowLeft, LuCompass } from "react-icons/lu";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-bg-base to-bg-elevated flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center mb-8">
          <BrandMark size="lg" direction="vertical" />
        </div>

        <h1 className="text-8xl font-bold font-serif mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-fg-base mb-2">
          Page Not Found
        </h2>
        <p className="text-fg-muted mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => router.back()} variant="ghost">
            <LuArrowLeft size={18} />
            Go Back
          </Button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-600 transition-colors shadow-md"
          >
            <LuHouse size={18} />
            Back to Home
          </Link>
        </div>

        <div className="mt-12 pt-6 border-t border-border-base text-xs text-fg-muted">
          <p>
            Need help?{" "}
            <Link href="/support" className="text-gold-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
