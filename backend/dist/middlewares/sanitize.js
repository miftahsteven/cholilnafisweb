"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeRichText = sanitizeRichText;
exports.sanitizePlainText = sanitizePlainText;
exports.detectPromptInjection = detectPromptInjection;
const sanitize_html_1 = __importDefault(require("sanitize-html"));
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
function sanitizeRichText(input) {
    return (0, sanitize_html_1.default)(input, {
        allowedTags: sanitize_html_1.default.defaults.allowedTags.concat(['img', 'h1', 'h2', 'figure', 'figcaption']),
        allowedAttributes: {
            ...sanitize_html_1.default.defaults.allowedAttributes,
            img: ['src', 'alt', 'width', 'height'],
            a: ['href', 'target', 'rel'],
        },
    });
}
/**
 * Strip all HTML from plain text input
 */
function sanitizePlainText(input) {
    return (0, sanitize_html_1.default)(input, { allowedTags: [], allowedAttributes: {} }).trim();
}
/**
 * Check for prompt injection attempts in chatbot input
 */
function detectPromptInjection(input) {
    return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}
