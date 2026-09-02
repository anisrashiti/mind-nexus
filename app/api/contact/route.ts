import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  organization: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email, and a message." },
      { status: 400 }
    );
  }

  const { name, email, organization, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "info@themindnexus.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    console.error("Contact form is not configured: missing RESEND_API_KEY");
    return NextResponse.json(
      { error: "The contact form isn't set up yet. Please email us directly instead." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `Mind Nexus website <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `New enquiry from ${name}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
