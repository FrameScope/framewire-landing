/* ─────────────────────────────────────────────────────────────────────────
   FrameWire — site configuration (single source of truth for external links).
   ───────────────────────────────────────────────────────────────────────── */

/**
 * Real authenticated FrameWire (PulseFeed) sign-in URL.
 *
 * There is no live public auth route yet. While this is an empty string, the
 * "Sign In" navigation item is hidden everywhere (no dead links, no email
 * fallback). Set it to the real URL — e.g. "https://app.framewire.io/login" —
 * and the nav item reappears automatically.
 */
export const SIGNIN_URL = "";

/** Public addresses for general enquiries and private beta requests. */
export const CONTACT_EMAIL = "info@framewire.io";
export const BETA_EMAIL = "betarequest@framewire.io";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const BETA_MAILTO = `mailto:${BETA_EMAIL}?subject=FrameWire%20Private%20Beta%20Access`;

/** Served from public/ → available at site root. */
export const LOGO = "/framewire-logo-white.png";
