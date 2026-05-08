export function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;

  if (!password) return { label: "—", level: 0 };
  if (score <= 1) return { label: "ضعیف", level: 1 };
  if (score <= 3) return { label: "متوسط", level: 2 };

  return { label: "قوی", level: 3 };
}
