import sanitizeHtml from 'sanitize-html';

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+previous\s+instructions?/i,
  /jailbreak/i,
  /forget\s+(everything|all|your\s+instructions?)/i,
  /you\s+are\s+now/i,
  /act\s+as\s+(if\s+you\s+are|a|an)\s+/i,
  /system\s*:/i,
  /\bdan\b.*\bmode\b/i,
];

/**
 * Sanitize HTML input from rich text editors
 */
export function sanitizeRichText(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'figure', 'figcaption']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height'],
      a: ['href', 'target', 'rel'],
    },
  });
}

/**
 * Strip all HTML from plain text input
 */
export function sanitizePlainText(input: string): string {
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim();
}

/**
 * Check for prompt injection attempts in chatbot input
 */
export function detectPromptInjection(input: string): boolean {
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}
