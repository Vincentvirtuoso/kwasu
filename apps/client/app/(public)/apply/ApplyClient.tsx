"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  BrandMark,
  Input,
  Alert,
  Modal,
  Checkbox,
} from "@kwasu-portal/components";
import {
  LuUser,
  LuCalendar,
  LuMail,
  LuPhone,
  LuMapPin,
  LuGraduationCap,
  LuSchool,
  LuArrowLeft,
  LuArrowRight,
  LuCircleCheck,
} from "react-icons/lu";

export function ApplyPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const programme = searchParams.get("programme");

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    previousInstitution: "",
    qualification: "",
    yearOfGraduation: "",
    agreeTerms: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  // Redirect if no programme selected
  useEffect(() => {
    if (!programme) {
      router.push("/");
    }
  }, [programme, router]);

  if (!programme) {
    return null; // or loading spinner
  }

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setError("Full name is required");
        return false;
      }
      if (!formData.dateOfBirth) {
        setError("Date of birth is required");
        return false;
      }
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError("Valid email is required");
        return false;
      }
      if (!formData.phone.trim()) {
        setError("Phone number is required");
        return false;
      }
      if (!formData.address.trim()) {
        setError("Address is required");
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.previousInstitution.trim()) {
        setError("Previous institution is required");
        return false;
      }
      if (!formData.qualification.trim()) {
        setError("Qualification is required");
        return false;
      }
      if (!formData.yearOfGraduation.trim()) {
        setError("Year of graduation is required");
        return false;
      }
    }
    setError(null);
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Application submitted:", { programme, ...formData });
      setShowSuccessModal(true);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-bg-base to-bg-elevated">
      {/* Header */}
      <div className="border-b border-border-base sticky top-0 z-10 backdrop-blur-sm bg-bg-surface/95">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-fg-muted hover:text-color-gold-600 transition-colors"
          >
            <LuArrowLeft size={18} />
            <span className="text-sm sm:block hidden">Back to Home</span>
          </Link>
          <BrandMark size="sm" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Programme Banner */}
        <div className="bg-color-gold-50 dark:bg-color-gold-950/20 rounded-2xl p-5 mb-8 border border-color-gold-200 dark:border-color-gold-800">
          <div className="flex items-start gap-3">
            <div className="bg-color-gold-500 rounded-full p-2 text-white shrink-0">
              <LuGraduationCap size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-color-gold-600 font-semibold">
                Applying for
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-fg-base">
                {decodeURIComponent(programme)}
              </h1>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                currentStep >= 1
                  ? "bg-color-gold-500 text-white"
                  : "bg-bg-elevated text-fg-muted"
              }`}
            >
              1
            </div>
            <div
              className={`h-0.5 flex-1 transition-colors ${
                currentStep > 1 ? "bg-color-gold-500" : "bg-border-base"
              }`}
            />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                currentStep >= 2
                  ? "bg-color-gold-500 text-white"
                  : "bg-bg-elevated text-fg-muted"
              }`}
            >
              2
            </div>
            <div
              className={`h-0.5 flex-1 transition-colors ${
                currentStep > 2 ? "bg-color-gold-500" : "bg-border-base"
              }`}
            />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                currentStep >= 3
                  ? "bg-color-gold-500 text-white"
                  : "bg-bg-elevated text-fg-muted"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-bg-surface rounded-2xl shadow-lg p-6 md:p-8 border border-border-base">
          {error && (
            <Alert variant="danger" className="mb-6">
              {error}
            </Alert>
          )}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-fg-base mb-4">
                Personal Information
              </h2>
              <Input
                label="Full Name"
                placeholder="e.g., Olawole Abdulmalik"
                leftIcon={<LuUser />}
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                required
              />
              <Input
                label="Date of Birth"
                type="date"
                leftIcon={<LuCalendar />}
                value={formData.dateOfBirth}
                onChange={(e) => updateField("dateOfBirth", e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                leftIcon={<LuMail />}
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />
              <Input
                label="Phone Number"
                placeholder="e.g., 0803 123 4567"
                leftIcon={<LuPhone />}
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                required
              />
              <Input
                label="Address"
                placeholder="Your residential address"
                leftIcon={<LuMapPin />}
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                required
              />
            </div>
          )}

          {/* Step 2: Academic Background */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-fg-base mb-4">
                Academic Background
              </h2>
              <Input
                label="Previous Institution"
                placeholder="e.g., Kwara State Polytechnic"
                leftIcon={<LuSchool />}
                value={formData.previousInstitution}
                onChange={(e) =>
                  updateField("previousInstitution", e.target.value)
                }
                required
              />
              <Input
                label="Highest Qualification"
                placeholder="e.g., OND, NCE, SSCE"
                leftIcon={<LuGraduationCap />}
                value={formData.qualification}
                onChange={(e) => updateField("qualification", e.target.value)}
                required
              />
              <Input
                label="Year of Graduation"
                placeholder="e.g., 2020"
                leftIcon={<LuCalendar />}
                value={formData.yearOfGraduation}
                onChange={(e) =>
                  updateField("yearOfGraduation", e.target.value)
                }
                required
              />
            </div>
          )}

          {/* Step 3: Declaration & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-fg-base mb-2">
                Declaration
              </h2>
              <div className="bg-bg-elevated rounded-xl p-4 text-sm text-fg-muted">
                <p className="mb-2">
                  By submitting this application, you confirm that:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>All information provided is accurate and complete.</li>
                  <li>
                    You understand that any false information may lead to
                    disqualification.
                  </li>
                  <li>
                    You agree to abide by the admission policies of KWASU.
                  </li>
                </ul>
              </div>
              <Checkbox
                label="I confirm that the information provided is true and I agree to the terms and conditions."
                checked={formData.agreeTerms}
                onChange={(e) => updateField("agreeTerms", e.target.checked)}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-4 border-t border-border-base">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-base hover:bg-bg-elevated transition-colors"
                disabled={isSubmitting}
              >
                <LuArrowLeft size={16} />
                Back
              </button>
            )}
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-color-gold-500 text-white hover:bg-color-gold-600 transition-colors ml-auto"
              >
                Continue
                <LuArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors ml-auto disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
                <LuCircleCheck size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={closeModal} size="md">
        <Modal.Header>Application Submitted!</Modal.Header>
        <Modal.Body>
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuCircleCheck className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-fg-base mb-2">
              Thank you for applying to{" "}
              <strong>{decodeURIComponent(programme)}</strong>.
            </p>
            <p className="text-fg-muted text-sm">
              Your application reference has been sent to your email. You will
              receive further instructions shortly.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={closeModal}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-color-gold-500 text-white hover:bg-color-gold-600"
          >
            Return Home
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
