const MAX_LINE = 200;
const MAX_MESSAGE = 4000;

// Single-line fields: collapse CR/LF so nothing can reach the email headers.
function line(v) {
  return String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, MAX_LINE);
}

// The message keeps its line breaks (it only goes in the plain-text body).
function message(v) {
  return String(v ?? "").replace(/\r\n?/g, "\n").trim().slice(0, MAX_MESSAGE);
}

export function validateContactMessage(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "invalid body" };
  }

  // Honeypot: company_url is a hidden field only bots fill in.
  if (line(body.company_url) !== "") {
    return { ok: false, error: "spam" };
  }

  const name = line(body.name);
  const email = line(body.email);
  const text = message(body.message);

  if (!email || !email.includes("@")) return { ok: false, error: "missing email" };
  if (!text) return { ok: false, error: "missing message" };

  return { ok: true, data: { name, email, message: text } };
}
