"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      organization: (form.elements.namedItem("organization") as HTMLInputElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? t("error"));
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : t("error"),
      );
    }
  }

  if (status === "success") {
    return (
      <div
        id="consult-form"
        className="w-full rounded-[22px] border border-ink/[0.09] bg-card p-8 text-center scroll-mt-24"
      >
        <p className="font-serif type-h4 text-black">{t("successTitle")}</p>
        <p className="mt-2 type-small text-muted">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form
      id="consult-form"
      onSubmit={handleSubmit}
      className="w-full scroll-mt-24 rounded-[22px] border border-ink/[0.09] bg-card p-8 text-center"
    >
      <p className="font-serif type-h4 text-black">{t("title")}</p>
      <p className="mt-2 type-small text-muted">{t("subtitle")}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-[6px] text-[13.5px] text-muted-2">
          {t("name")}
          <input
            name="name"
            type="text"
            required
            className="rounded-lg border border-ink/[0.18] bg-cream px-3 py-[10px] text-left text-[14.5px] text-ink outline-none focus:border-rust"
          />
        </label>
        <label className="flex flex-col gap-[6px] text-[13.5px] text-muted-2">
          {t("email")}
          <input
            name="email"
            type="email"
            required
            className="rounded-lg border border-ink/[0.18] bg-cream px-3 py-[10px] text-left text-[14.5px] text-ink outline-none focus:border-rust"
          />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-[6px] text-[13.5px] text-muted-2">
        {t("organization")}{" "}
        <span className="text-muted-3">{t("optional")}</span>
        <input
          name="organization"
          type="text"
          className="rounded-lg border border-ink/[0.18] bg-cream px-3 py-[10px] text-left text-[14.5px] text-ink outline-none focus:border-rust"
        />
      </label>

      <label className="mt-4 flex flex-col gap-[6px] text-[13.5px] text-muted-2">
        {t("message")}
        <textarea
          name="message"
          required
          rows={4}
          className="resize-none rounded-lg border border-ink/[0.18] bg-cream px-3 py-[10px] text-left text-[14.5px] text-ink outline-none focus:border-rust"
        />
      </label>

      {status === "error" && (
        <p className="mt-4 text-[13.5px] text-rust">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 whitespace-nowrap rounded-full bg-rust px-8 py-4 text-[15.5px] font-medium text-cream hover:bg-rust-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
