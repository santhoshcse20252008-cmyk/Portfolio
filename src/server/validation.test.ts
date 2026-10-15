import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizeString,
  isValidEmail,
  validateContactSubmission,
  createSlug,
  hashPassword,
  verifyPassword
} from './validation.ts';

test('sanitizeString strips tags and trims whitespace', () => {
  assert.equal(sanitizeString('  <script>alert("hack")</script> Hello world!  '), 'alert("hack") Hello world!');
  assert.equal(sanitizeString('<b>Bold</b>'), 'Bold');
  assert.equal(sanitizeString(123), '');
});

test('isValidEmail correctly identifies valid and invalid emails', () => {
  assert.equal(isValidEmail('santhoshcse20252008@gmail.com'), true);
  assert.equal(isValidEmail('student.cs@university.edu'), true);
  assert.equal(isValidEmail('plainaddress'), false);
  assert.equal(isValidEmail('@missingusername.com'), false);
  assert.equal(isValidEmail('user@.com'), false);
  assert.equal(isValidEmail(''), false);
});

test('validateContactSubmission catches missing and short fields', () => {
  const invalidResult = validateContactSubmission({
    name: 'A',
    email: 'bad-email',
    subject: 'hi',
    message: 'short'
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.subject);
  assert.ok(invalidResult.errors.message);
});

test('validateContactSubmission approves clean valid inputs', () => {
  const validResult = validateContactSubmission({
    name: 'Santhosh Kumar',
    email: 'santhoshcse20252008@gmail.com',
    subject: 'Software Engineering Opportunity Discussion',
    message: 'Hello! I came across your portfolio and would love to connect about an internship opportunity.'
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
  assert.equal(validResult.sanitizedData?.name, 'Santhosh Kumar');
});

test('createSlug formats titles into safe URLs', () => {
  assert.equal(createSlug('AI Cloud Platform v2.0!'), 'ai-cloud-platform-v20');
  assert.equal(createSlug('  Real-time Distributed Chat  '), 'real-time-distributed-chat');
});

test('hashPassword and verifyPassword work reliably', () => {
  const salt = 'portfolio_secret_salt_2026';
  const hashed = hashPassword('admin123', salt);
  assert.equal(verifyPassword('admin123', hashed, salt), true);
  assert.equal(verifyPassword('wrongpassword', hashed, salt), false);
});
