/**
 * Password validation utility
 * Password must be 8-15 characters long and contain:
 * - At least one digit
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one special character (!@#$%&*()-+=^.)
 * - No whitespace
 */

exports.validatePassword = (password) => {
  // Check password length
  if (password.length < 8 || password.length > 15) {
    return {
      isValid: false,
      error: "Password must be 8-15 characters long",
    };
  }

  // Check for digit
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one digit",
    };
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one uppercase letter",
    };
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one lowercase letter",
    };
  }

  // Check for special character
  if (!/[!@#$%&*()-+=^.]/.test(password)) {
    return {
      isValid: false,
      error:
        "Password must contain at least one special character (!@#$%&*()-+=^.)",
    };
  }

  // Check for whitespace
  if (/\s/.test(password)) {
    return {
      isValid: false,
      error: "Password must not contain whitespace",
    };
  }

  return { isValid: true };
};
