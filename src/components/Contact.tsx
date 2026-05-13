"use client";

import { Section, SectionTitle } from "./Section";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { type FormEvent, useState } from "react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/s-dudhiya" },
  { icon: Linkedin, label: "LinkedIn", href: "https://in.linkedin.com/in/shabbir-dudhiya" },
  { icon: Mail, label: "Email", href: "mailto:s.k.dudhiyawala@gmail.com" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  async function sendEmail() {
    const name = formValues.name.trim();
    const email = formValues.email.trim();
    const message = formValues.message.trim();

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      setStatus("error");
      setStatusMessage("email service not configured");
      return;
    }

    if (!name || !email || !message) {
      setStatus("error");
      setStatusMessage("complete all fields");
      return;
    }

    setStatus("loading");
    setStatusMessage("sending...");

    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 15000);
      const time = new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date());

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          service_id: emailJsServiceId,
          template_id: emailJsTemplateId,
          user_id: emailJsPublicKey,
          template_params: {
            to_email: "s.k.dudhiyawala@gmail.com",
            name,
            email,
            time,
            message,
            from_name: name,
            from_email: email,
            reply_to: email,
          },
        }),
      });
      window.clearTimeout(timeout);

      if (!response.ok) {
        console.warn("EmailJS request failed:", await response.text());
        throw new Error("Email request failed");
      }

      setFormValues({ name: "", email: "", message: "" });
      setStatus("success");
      setStatusMessage("message sent");
    } catch {
      setStatus("error");
      setStatusMessage("message failed");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    void sendEmail();
  }

  return (
    <Section id="contact" className="pb-14 md:pb-20 lg:pb-24">
      <SectionTitle index="06" title="CONTACT" subtitle="// open.channel" />

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="amber-glow-text font-mono text-3xl leading-[1.1] tracking-tight text-warm-beige sm:text-4xl md:text-6xl"
      >
        Let's build something <span className="text-amber-glow">real.</span>
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 max-w-2xl font-mono text-sm leading-relaxed text-warm-gray"
      >
        Whether it's automation, backend systems, scraping infrastructure, or a complete product
        idea — I'm always open to building impactful solutions.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        method="dialog"
        action="javascript:void(0)"
        onSubmit={handleSubmit}
        onSubmitCapture={(event) => event.preventDefault()}
        noValidate
        className="contact-form mt-10 border p-4 font-mono md:mt-12 md:p-5"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="contact-label mb-2 block text-[10px] tracking-[0.3em]">NAME</span>
            <input
              name="name"
              required
              value={formValues.name}
              onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
              disabled={status === "loading"}
              className="contact-field w-full border px-3 py-2 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="your name"
            />
          </label>
          <label className="block">
            <span className="contact-label mb-2 block text-[10px] tracking-[0.3em]">EMAIL</span>
            <input
              name="email"
              type="email"
              required
              value={formValues.email}
              onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))}
              disabled={status === "loading"}
              className="contact-field w-full border px-3 py-2 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="your@email.com"
            />
          </label>
        </div>

        <label className="mt-3 block">
          <span className="contact-label mb-2 block text-[10px] tracking-[0.3em]">MESSAGE</span>
          <textarea
            name="message"
            required
            rows={3}
            value={formValues.message}
            onChange={(e) => setFormValues((prev) => ({ ...prev, message: e.target.value }))}
            disabled={status === "loading"}
            className="contact-field w-full resize-none border px-3 py-2 text-sm leading-relaxed outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Hi Shabbir, great connecting with you..."
          />
        </label>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "loading"}
            className="contact-submit border bg-transparent px-5 py-2 text-left text-[10px] tracking-[0.3em] transition-colors hover:text-amber-glow disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "SENDING..." : "SEND"}
          </button>
          {statusMessage && (
            <span
              className={`text-[10px] tracking-[0.3em] ${
                status === "success" ? "text-amber-glow" : "text-[var(--terminal-error)]"
              }`}
            >
              {statusMessage}
            </span>
          )}
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-5 border-t border-border/60 py-4 font-mono md:mt-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3 text-[10px] tracking-[0.3em] text-amber-dim">
              <MapPin className="h-3.5 w-3.5" />
              LOCATION
            </div>
            <div className="text-sm text-warm-beige">Ahmedabad, Gujarat, India</div>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={social.label}
                  title={social.label}
                  className="contact-social-link flex h-9 w-9 items-center justify-center border"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="mt-2 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-4 text-center font-mono text-[10px] tracking-[0.22em] text-warm-gray sm:tracking-[0.3em] md:mt-3 md:flex-row md:pt-5">
        <span>© 2026 SHABBIR DUDHIYA</span>
        <span className="cursor-blink">SYSTEM ONLINE</span>
      </div>
    </Section>
  );
}
