import React from 'react';
import type { FormData } from '../data';
import { roleOptions, notificationTypes, themeChoices } from '../data';
import ValidationMessage from './ValidationMessage';

const ACCENT = '#7C3AED';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface FormStepProps {
  step: number;
  formData: FormData;
  onChange: (field: keyof FormData, value: string | string[]) => void;
  errors?: Record<string, string>;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: FONT_FAMILY,
    maxWidth: '480px',
    margin: '0 auto',
  },
  fieldGroup: {
    marginBottom: '1.25rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '0.35rem',
    fontFamily: FONT_FAMILY,
  },
  input: {
    fontFamily: FONT_FAMILY,
    width: '100%',
    padding: '0.6rem 0.75rem',
    fontSize: '0.95rem',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
    color: '#111827',
    background: '#FFFFFF',
  },
  inputFocus: {
    borderColor: ACCENT,
  },
  select: {
    fontFamily: FONT_FAMILY,
    width: '100%',
    padding: '0.6rem 0.75rem',
    fontSize: '0.95rem',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    outline: 'none',
    color: '#111827',
    background: '#FFFFFF',
    boxSizing: 'border-box' as const,
    cursor: 'pointer',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontFamily: FONT_FAMILY,
    fontSize: '0.9rem',
    color: '#374151',
    cursor: 'pointer',
  },
  checkbox: {
    accentColor: ACCENT,
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  radioRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
    fontFamily: FONT_FAMILY,
    fontSize: '0.9rem',
    color: '#374151',
    cursor: 'pointer',
  },
  radio: {
    accentColor: ACCENT,
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#6B7280',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '0.75rem',
    marginTop: '1.5rem',
  },
  reviewSection: {
    fontFamily: FONT_FAMILY,
    background: '#F9FAFB',
    borderRadius: '8px',
    padding: '1.25rem',
    marginBottom: '1rem',
  },
  reviewRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.4rem 0',
    borderBottom: '1px solid #E5E7EB',
    fontSize: '0.9rem',
    fontFamily: FONT_FAMILY,
  },
  reviewLabel: {
    color: '#6B7280',
    fontWeight: 500,
  },
  reviewValue: {
    color: '#111827',
    fontWeight: 600,
    textAlign: 'right' as const,
    maxWidth: '60%',
    wordBreak: 'break-word' as const,
  },
};

function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = ACCENT;
}

function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = '#D1D5DB';
}

function ProfileStep({ formData, onChange, errors = {} }: Omit<FormStepProps, 'step'>) {
  return (
    <div data-testid="step-content-1">
      <div style={styles.fieldGroup}>
        <label style={styles.label} htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          style={styles.input}
          type="text"
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter your first name"
          data-testid="field-firstName"
        />
        <ValidationMessage fieldName="firstName" message={errors.firstName || ''} />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label} htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          style={styles.input}
          type="text"
          value={formData.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Enter your last name"
          data-testid="field-lastName"
        />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label} htmlFor="email">Email</label>
        <input
          id="email"
          style={styles.input}
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="you@example.com"
          data-testid="field-email"
        />
        <ValidationMessage fieldName="email" message={errors.email || ''} />
      </div>

      <div style={styles.fieldGroup}>
        <label style={styles.label} htmlFor="phone">Phone</label>
        <input
          id="phone"
          style={styles.input}
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="+1 (555) 000-0000"
          data-testid="field-phone"
        />
      </div>
    </div>
  );
}

function PreferencesStep({ formData, onChange }: Omit<FormStepProps, 'step' | 'errors'>) {
  const handleNotificationChange = (value: string, checked: boolean) => {
    const updated = checked
      ? [...formData.notifications, value]
      : formData.notifications.filter((n) => n !== value);
    onChange('notifications', updated);
  };

  return (
    <div data-testid="step-content-2">
      <div style={styles.fieldGroup}>
        <label style={styles.label} htmlFor="role">Role</label>
        <select
          id="role"
          style={styles.select}
          value={formData.role}
          onChange={(e) => onChange('role', e.target.value)}
          onFocus={handleFocus as any}
          onBlur={handleBlur as any}
          data-testid="field-role"
        >
          {roleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {formData.role === 'developer' && (
        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="githubUsername">GitHub Username</label>
          <input
            id="githubUsername"
            style={styles.input}
            type="text"
            value={formData.githubUsername}
            onChange={(e) => onChange('githubUsername', e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="e.g. octocat"
            data-testid="field-githubUsername"
          />
        </div>
      )}

      <div style={styles.sectionTitle}>Notifications</div>
      {notificationTypes.map((opt) => (
        <label key={opt.value} style={styles.checkboxRow}>
          <input
            type="checkbox"
            style={styles.checkbox}
            checked={formData.notifications.includes(opt.value)}
            onChange={(e) => handleNotificationChange(opt.value, e.target.checked)}
            data-testid={`field-notification-${opt.value}`}
          />
          {opt.label}
        </label>
      ))}

      <div style={styles.sectionTitle}>Theme</div>
      {themeChoices.map((opt) => (
        <label key={opt.value} style={styles.radioRow}>
          <input
            type="radio"
            name="theme"
            style={styles.radio}
            value={opt.value}
            checked={formData.theme === opt.value}
            onChange={(e) => onChange('theme', e.target.value)}
            data-testid={`field-theme-${opt.value}`}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

function ReviewStep({ formData }: { formData: FormData }) {
  const notificationLabels = formData.notifications
    .map((n) => notificationTypes.find((t) => t.value === n)?.label || n)
    .join(', ');

  const themeLabel = themeChoices.find((t) => t.value === formData.theme)?.label || formData.theme;
  const roleLabel = roleOptions.find((r) => r.value === formData.role)?.label || 'Not selected';

  const reviewItems = [
    { label: 'First Name', value: formData.firstName || '-' },
    { label: 'Last Name', value: formData.lastName || '-' },
    { label: 'Email', value: formData.email || '-' },
    { label: 'Phone', value: formData.phone || '-' },
    { label: 'Role', value: roleLabel },
    ...(formData.role === 'developer'
      ? [{ label: 'GitHub Username', value: formData.githubUsername || '-' }]
      : []),
    { label: 'Notifications', value: notificationLabels || 'None' },
    { label: 'Theme', value: themeLabel },
  ];

  return (
    <div data-testid="step-content-3">
      <div style={styles.reviewSection}>
        {reviewItems.map((item, i) => (
          <div
            key={item.label}
            style={{
              ...styles.reviewRow,
              ...(i === reviewItems.length - 1 ? { borderBottom: 'none' } : {}),
            }}
          >
            <span style={styles.reviewLabel}>{item.label}</span>
            <span style={styles.reviewValue}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FormStep({ step, formData, onChange, errors }: FormStepProps) {
  return (
    <div style={styles.container}>
      {step === 1 && <ProfileStep formData={formData} onChange={onChange} errors={errors} />}
      {step === 2 && <PreferencesStep formData={formData} onChange={onChange} />}
      {step === 3 && <ReviewStep formData={formData} />}
    </div>
  );
}
