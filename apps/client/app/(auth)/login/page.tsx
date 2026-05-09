"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { BrandMark, Alert, Input } from "@kwasu-portal/components";
import { LuGraduationCap, LuLockKeyhole } from "react-icons/lu";

const PROGRAMMES = [
  "CAILS-KWASU Sandwich",
  "Caribbean College of Health",
  "Center for Advanced and Basic Studies (CAILS/KWASU)",
  "Center for Advanced and Basic Studies (IJMB/JUPEB)",
  "Center for Advanced and Basic Studies (REMEDIAL/PREDEGREE)",
  "Centre for Consultancy Services",
  "Centre for Digital Economy",
  "CEERMS Application",
  "CEERMS-Ilorin KWASU Center",
  "CEERMS-NEWGATE",
  "CEERMS-OSCOTECH",
  "College of Health Technology Ilese-Ijebu",
  "College of Health Technology Ijero",
  "College of Health Technology Moro",
  "College of Health Technology Offa",
  "Edumana College of Health Sciences & Technology Bida",
  "Emirates College of Health Sciences and Technology",
  "Garu Islamic College of Health Technology",
  "IDEL Part-Time",
  "IMAM Hamza-KWASU Sandwich",
  "Institute of Education",
  "Institute of Foundational Studies",
  "KN Institute",
  "KWASU Business School (Executive)",
  "KWASU Business School (Regular)",
  "KWASU Certificate Courses",
  "KWASU French Certificate Courses",
  "Law Diploma",
  "NANAISHA-KWASU Sandwich",
  "PAN AFRICA COLLEGE OF HEALTH TECHNOLOGY",
  "Post-UTME Registration & Verification",
  "Postgraduate",
  "Professional Diploma in Education",
  "Royal Institute of Health Technology Ifo",
  "Topup Degree/HND Conversion Programme",
];

export default function LoginPage() {
  const router = useRouter();
  const { login, loading: authLoading, isAuthenticated, user } = useAuth();
  const [matricNo, setMatricNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!matricNo.trim() || !password.trim()) {
      setError("Matric number and password are required");
      setIsSubmitting(false);
      return;
    }

    const result = await login(matricNo, password);

    if (!result.ok) {
      setError(result.error || "Login failed. Please check your credentials.");
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT BANNER – Programmes & Branding */}
      <div className="w-full md:w-1/2 bg-linear-to-br from-[#0a2b1f] to-[#1a4a33] text-white p-6 md:p-10 flex flex-col">
        <BrandMark size="lg" className="mb-6 md:mb-10" alt="KWASU Logo" />
        <div className="flex-1 overflow-y-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
            Admission & Application Portals
          </h2>
          <p className="text-sm text-white/70 mb-6">
            Select your programme to proceed with login
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {PROGRAMMES.map((programme, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  console.log("Selected:", programme);
                }}
              >
                <span className="text-gold-400 text-lg">•</span>
                <span className="truncate">{programme}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-xs text-white/50 text-center border-t border-white/20 pt-4">
          © {new Date().getFullYear()} Kwara State University
        </div>
      </div>

      {/* RIGHT COLUMN – Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-bg-base px-6 py-12 md:px-10 lg:px-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <div className="mx-auto md:mx-0 h-12 w-12 rounded-full bg-color-gold-500 flex items-center justify-center mb-4">
              <span className="text-white font-serif text-xl font-bold">K</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-fg-base">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              Sign in to your KWASU Portal account
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Matric Number"
              type="text"
              autoComplete="username"
              required
              value={matricNo}
              onChange={(e) => setMatricNo(e.target.value)}
              placeholder="e.g., 21/XXXXX"
              leftIcon={<LuGraduationCap />}
              disabled={isLoading}
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<LuLockKeyhole />}
              disabled={isLoading}
            />

            {error && (
              <Alert variant="danger" onDismiss={() => setError(null)}>
                {error}
              </Alert>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-fg-muted">
                <input
                  type="checkbox"
                  className="rounded border-border-base text-color-gold-500 focus:ring-color-gold-500"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-color-gold-600 hover:text-color-gold-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-color-gold-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-color-gold-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-color-gold-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-fg-muted">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-color-gold-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline hover:text-color-gold-600"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
