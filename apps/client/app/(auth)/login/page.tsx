"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BrandMark,
  Alert,
  Input,
  Checkbox,
  Button,
  Modal,
} from "@kwasu-portal/components";
import {
  LuGraduationCap,
  LuLockKeyhole,
  LuSearch,
  LuChevronRight,
  LuArrowRight,
} from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";

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
  const { login, isLoading: authLoading, isAuthenticated, user } = useAuth();

  const [matricNo, setMatricNo] = useState("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProgrammes = useMemo(() => {
    return PROGRAMMES.filter((p) =>
      p.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);
  const onModalClose = () => {
    setIsModalOpen(false);
    setSearchQuery("");
  };
  const handleSelect = (programme: string) => {
    onModalClose();
    router.push(`/apply?programme=${encodeURIComponent(programme)}`);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const result = await login({ matricNo, password, rememberMe });
    if (!result.success) {
      setError(
        result.error && typeof result.error === "string"
          ? result.error
          : "Login failed.",
      );
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-bg-base overflow-hidden">
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-[#0a2b1f] text-white p-8 lg:p-12 flex-col relative h-full">
        <div className="relative z-10 flex flex-col h-full overflow-hidden">
          <BrandMark size="lg" className="mb-6 shrink-0" />

          <div className="mb-6 shrink-0">
            <h2 className="text-3xl font-bold mb-2 tracking-tight">
              New Applicant?
            </h2>
            <p className="text-white/60 text-sm">
              Select your programme to start your application.
            </p>
          </div>

          <Input
            placeholder="Filter programmes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<LuSearch className="text-white/40" />}
            className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 pb-4 mt-4">
            {filteredProgrammes.map((programme) => (
              <button
                key={programme}
                onClick={() =>
                  router.push(
                    `/apply?programme=${encodeURIComponent(programme)}`,
                  )
                }
                className="w-full flex items-center justify-between p-4 rounded-xl text-left text-sm transition-all group bg-white/5 hover:bg-white/10 text-white/80"
              >
                <span className="truncate pr-4 font-medium">{programme}</span>
                <LuChevronRight className="shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>

          <footer className="mt-auto pt-6 border-t border-white/10 text-[10px] uppercase tracking-widest text-white/30 shrink-0">
            © {new Date().getFullYear()} Kwara State University
          </footer>
        </div>
      </div>

      <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto h-full">
        <div className="md:hidden w-full flex flex-col items-center mb-8 shrink-0">
          <BrandMark size="md" className="mb-4" direction="vertical" />
        </div>

        <div className="w-full max-w-sm py-8">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-fg-base tracking-tight">
              Student Login
            </h1>
            <p className="mt-2 text-sm text-fg-muted">
              Sign in with your matric number and password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Matric Number / Application Number"
              placeholder="e.g. 21/00HS/000"
              leftIcon={<LuGraduationCap className="text-fg-muted" />}
              value={matricNo}
              onChange={(e) => setMatricNo(e.target.value)}
              disabled={isLoading}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<LuLockKeyhole className="text-fg-muted" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />

            {error && (
              <Alert variant="danger" className="text-xs">
                {error}
              </Alert>
            )}

            <div className="flex items-center justify-between">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link
                href="/forgot-password"
                className="text-sm font-semibold whitespace-nowrap text-gold-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" disabled={isLoading} fullWidth size="lg">
              {isLoading ? "Verifying..." : "Sign In to Portal"}
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSearchQuery("");
              }}
              fullWidth
              variant="ghost"
              type="button"
              className="md:hidden flex"
              rightIcon={<LuArrowRight />}
            >
              New Applicant? Apply Here
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-fg-muted leading-loose">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-fg-base hover:underline"
            >
              Terms of Service
            </Link>{" "}
            &{" "}
            <Link
              href="/privacy"
              className="font-medium text-fg-base hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={onModalClose} className="h-120">
        <Modal.Header>Select Programme</Modal.Header>
        <div className="p-4">
          <Input
            placeholder="Filter programmes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<LuSearch className="text-fg-muted font-light" />}
          />
        </div>
        <Modal.Body>
          <div className="flex-1 space-y-2">
            {filteredProgrammes.map((programme) => (
              <button
                key={programme}
                onClick={() => handleSelect(programme)}
                className="w-full flex items-center justify-between p-3 rounded-xl text-left text-sm hover:bg-bg-elevated transition-colors group"
              >
                <span className="truncate pr-4">{programme}</span>
                <LuChevronRight className="shrink-0 text-fg-muted group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
            {filteredProgrammes.length === 0 && (
              <p className="text-center text-fg-muted py-8">
                No programmes found
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
