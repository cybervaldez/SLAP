import React, { useState } from 'react';
import type { ArchetypeDemoProps } from '../../types';
import { stepDefinitions, initialFormData } from './data';
import type { FormData } from './data';
import StepIndicator from './components/StepIndicator';
import FormStep from './components/FormStep';

const ACCENT = '#7C3AED';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    fontFamily: FONT_FAMILY,
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem 1.5rem 3rem',
  },
  heading: {
    fontFamily: FONT_FAMILY,
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#111827',
    textAlign: 'center' as const,
    margin: '0 0 0.25rem',
  },
  subtitle: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.95rem',
    color: '#6B7280',
    textAlign: 'center' as const,
    margin: '0 0 1rem',
    fontWeight: 400,
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    padding: '2rem 1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #E5E7EB',
  },
  backBtn: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '0.6rem 1.5rem',
    border: `1px solid #D1D5DB`,
    borderRadius: '8px',
    background: '#FFFFFF',
    color: '#374151',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  nextBtn: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '0.6rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    background: ACCENT,
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  submitBtn: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '0.6rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    background: '#059669',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  spacer: {
    width: '1px',
  },
  successOverlay: {
    fontFamily: FONT_FAMILY,
    textAlign: 'center' as const,
    padding: '3rem 1.5rem',
  },
  successIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: '#D1FAE5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.25rem',
  },
  successHeading: {
    fontFamily: FONT_FAMILY,
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#065F46',
    margin: '0 0 0.5rem',
  },
  successText: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.95rem',
    color: '#6B7280',
    margin: '0',
  },
};

export default function FormHeavyDemo(_props: ArchetypeDemoProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({ ...initialFormData });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = stepDefinitions.length;
  const stepLabels = stepDefinitions.map((s) => s.label);

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required.';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={styles.wrapper} data-testid="form-heavy-demo">
        <div style={styles.card}>
          <div style={styles.successOverlay} data-testid="form-success">
            <div style={styles.successIcon}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 17L13 22L24 10"
                  stroke="#059669"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 style={styles.successHeading}>Submission Successful</h2>
            <p style={styles.successText}>
              Thank you, {formData.firstName}! Your information has been submitted successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper} data-testid="form-heavy-demo">
      <h1 style={styles.heading}>Create Your Account</h1>
      <p style={styles.subtitle}>Complete the steps below to set up your profile.</p>

      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepLabels={stepLabels}
      />

      <div style={styles.card}>
        <FormStep
          step={currentStep}
          formData={formData}
          onChange={handleChange}
          errors={errors}
        />

        <div style={styles.navigation}>
          {currentStep > 1 ? (
            <button
              style={styles.backBtn}
              onClick={handleBack}
              data-testid="form-back"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#F3F4F6';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#FFFFFF';
              }}
            >
              Back
            </button>
          ) : (
            <div style={styles.spacer} />
          )}

          {currentStep < totalSteps ? (
            <button
              style={styles.nextBtn}
              onClick={handleNext}
              data-testid="form-next"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              }}
            >
              Next
            </button>
          ) : (
            <button
              style={styles.submitBtn}
              onClick={handleSubmit}
              data-testid="form-submit"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
