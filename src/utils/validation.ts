export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export interface ValidationErrors {
  email?: string;
  phone?: string;
}

import { ResumeData } from '../types/resume';

export const validateForm = (data: ResumeData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid 10 digits phone number';
  }

  return errors;
};