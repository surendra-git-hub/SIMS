/**
 * Password validation utility
 * Validates password according to constraints:
 * - 8-15 characters long
 * - At least one digit
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one special character (!@#$%&*()-+=^.)
 * - No whitespace
 */

export const validatePassword = (password) => {
  const errors = [];

  // Check password length
  if (password.length < 8 || password.length > 15) {
    errors.push("Password must be 8-15 characters long");
  }

  // Check for digit
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one digit");
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  // Check for special character
  if (!/[!@#$%&*()-+=^.]/.test(password)) {
    errors.push(
      "Password must contain at least one special character (!@#$%&*()-+=^.)",
    );
  }

  // Check for whitespace
  if (/\s/.test(password)) {
    errors.push("Password must not contain whitespace");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Email validation utility
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Phone number validation utility
 */
export const validatePhoneNumber = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};
