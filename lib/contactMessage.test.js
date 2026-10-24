import { describe, it, expect } from "vitest";
import { validateContactMessage } from "./contactMessage.js";

const valid = { name: "Dana Lee", email: "dana@northwind.com", message: "Hi there" };

describe("validateContactMessage", () => {
  it("accepts a valid message and trims fields", () => {
    const res = validateContactMessage({ name: " Dana Lee ", email: " dana@northwind.com ", message: "  Hi there  " });
    expect(res).toEqual({ ok: true, data: valid });
  });

  it("makes the name optional", () => {
    expect(validateContactMessage({ ...valid, name: "" })).toEqual({ ok: true, data: { ...valid, name: "" } });
  });

  it("rejects a missing email or one without an @", () => {
    expect(validateContactMessage({ ...valid, email: "" })).toEqual({ ok: false, error: "missing email" });
    expect(validateContactMessage({ ...valid, email: "dana" })).toEqual({ ok: false, error: "missing email" });
  });

  it("rejects a blank message", () => {
    expect(validateContactMessage({ ...valid, message: "   " })).toEqual({ ok: false, error: "missing message" });
  });

  it("rejects when the honeypot is filled", () => {
    expect(validateContactMessage({ ...valid, company_url: "http://bot.example" })).toEqual({ ok: false, error: "spam" });
  });

  it("rejects a non-object body", () => {
    expect(validateContactMessage(null)).toEqual({ ok: false, error: "invalid body" });
  });

  it("keeps line breaks in the message but not in name or email", () => {
    const res = validateContactMessage({ name: "Dana\r\nBcc: x@y.z", email: "dana@northwind.com\nBcc: x@y.z", message: "Line one\r\nLine two" });
    expect(res.data.name).toBe("Dana Bcc: x@y.z");
    expect(res.data.email).toBe("dana@northwind.com Bcc: x@y.z");
    expect(res.data.message).toBe("Line one\nLine two");
  });

  it("caps long values", () => {
    const res = validateContactMessage({ ...valid, name: "x".repeat(500), message: "y".repeat(9000) });
    expect(res.data.name.length).toBe(200);
    expect(res.data.message.length).toBe(4000);
  });
});
