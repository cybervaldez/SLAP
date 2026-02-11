export interface StepDefinition {
  id: number;
  label: string;
}

export interface PreferenceOption {
  value: string;
  label: string;
}

export interface ValidationRuleDescription {
  field: string;
  rule: string;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  notifications: string[];
  theme: string;
  githubUsername: string;
}

export const stepDefinitions: StepDefinition[] = [
  { id: 1, label: 'Profile' },
  { id: 2, label: 'Preferences' },
  { id: 3, label: 'Review' },
];

export const roleOptions: PreferenceOption[] = [
  { value: '', label: 'Select a role' },
  { value: 'designer', label: 'Designer' },
  { value: 'developer', label: 'Developer' },
  { value: 'manager', label: 'Project Manager' },
  { value: 'analyst', label: 'Data Analyst' },
  { value: 'other', label: 'Other' },
];

export const notificationTypes: PreferenceOption[] = [
  { value: 'email', label: 'Email notifications' },
  { value: 'sms', label: 'SMS notifications' },
  { value: 'push', label: 'Push notifications' },
  { value: 'weekly', label: 'Weekly digest' },
];

export const themeChoices: PreferenceOption[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System default' },
];

export const validationRules: ValidationRuleDescription[] = [
  { field: 'firstName', rule: 'Required. Must not be empty.' },
  { field: 'email', rule: 'Required. Must not be empty.' },
  { field: 'role', rule: 'Optional. Select your primary role.' },
  { field: 'githubUsername', rule: 'Required when role is Developer.' },
];

export const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
  notifications: [],
  theme: 'light',
  githubUsername: '',
};
