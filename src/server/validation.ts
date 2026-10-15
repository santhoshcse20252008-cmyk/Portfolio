import crypto from 'node:crypto';

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult<T> {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: T;
}

/**
 * Strips dangerous HTML tags and trims whitespace to prevent basic XSS and injection
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // strip all HTML tags like <script>...</script>
    .replace(/[<>]/g, '')     // strip any stray brackets
    .trim();
}

/**
 * Validates email with standard RFC 5322 compliant regex pattern
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates contact form submissions
 */
export function validateContactSubmission(body: Record<string, unknown>): ValidationResult<ContactSubmission> {
  const errors: Record<string, string> = {};

  const name = sanitizeString(body.name);
  const email = sanitizeString(body.email);
  const subject = sanitizeString(body.subject);
  const message = sanitizeString(body.message);

  if (!name || name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 80) {
    errors.name = 'Name must not exceed 80 characters.';
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!subject || subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  } else if (subject.length > 150) {
    errors.subject = 'Subject must not exceed 150 characters.';
  }

  if (!message || message.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  } else if (message.length > 3000) {
    errors.message = 'Message is too long (max 3000 characters).';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    sanitizedData: isValid
      ? {
          name,
          email,
          subject,
          message,
        }
      : undefined,
  };
}

/**
 * Creates a URL-friendly slug from a project title
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Password hashing with SHA-256 + salt
 */
export function hashPassword(password: string, salt: string = 'portfolio_secret_salt_2026'): string {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

/**
 * Safe password verification using constant-time comparison
 */
export function verifyPassword(provided: string, expectedHash: string, salt: string = 'portfolio_secret_salt_2026'): boolean {
  const hash = hashPassword(provided, salt);
  if (hash.length !== expectedHash.length) return false;
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
}
