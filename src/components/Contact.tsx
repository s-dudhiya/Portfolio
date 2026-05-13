"use client";

import { Section, SectionTitle } from "./Section";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";

const contactItems = [
  { icon: MapPin, label: "LOCATION", value: "Ahmedabad, Gujarat, India", href: undefined },
  { icon: Mail, label: "EMAIL", value: "s.k.dudhiyawala@gmail.com", href: "mailto:s.k.dudhiyawala@gmail.com" },
  { icon: Phone, label: "PHONE", value: "+91 8140099572", href: "tel:+918140099572" },
  { icon: Github, label: "GITHUB", value: "github.com/s-dudhiya", href: "https://github.com/s-dudhiya" },
  { icon: Linkedin, label: "LINKEDIN", value: "linkedin.com/in/shabbir-dudhiya", href: "https://in.linkedin.com/in/shabbir-dudhiya" },
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
    <Section id="contact" className="pb-20 md:pb-32 lg:pb-40">
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
        className="mt-10 border border-border/60 bg-background p-4 font-mono md:mt-12 md:p-5"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[10px] tracking-[0.3em] text-amber-dim">NAME</span>
            <input
              name="name"
              required
              value={formValues.name}
              onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
              disabled={status === "loading"}
              className="w-full border border-border/60 bg-terminal/60 px-3 py-2 text-sm text-warm-beige outline-none transition-colors placeholder:text-warm-gray/60 focus:border-amber-dim focus:shadow-[0_0_16px_var(--control-glow)] disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="your name"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[10px] tracking-[0.3em] text-amber-dim">EMAIL</span>
            <input
              name="email"
              type="email"
              required
              value={formValues.email}
              onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))}
              disabled={status === "loading"}
              className="w-full border border-border/60 bg-terminal/60 px-3 py-2 text-sm text-warm-beige outline-none transition-colors placeholder:text-warm-gray/60 focus:border-amber-dim focus:shadow-[0_0_16px_var(--control-glow)] disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="your@email.com"
            />
          </label>
        </div>

        <label className="mt-3 block">
          <span className="mb-2 block text-[10px] tracking-[0.3em] text-amber-dim">MESSAGE</span>
          <textarea
            name="message"
            required
            rows={3}
            value={formValues.message}
            onChange={(e) => setFormValues((prev) => ({ ...prev, message: e.target.value }))}
            disabled={status === "loading"}
            className="w-full resize-none border border-border/60 bg-terminal/60 px-3 py-2 text-sm leading-relaxed text-warm-beige outline-none transition-colors placeholder:text-warm-gray/60 focus:border-amber-dim focus:shadow-[0_0_16px_var(--control-glow)] disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="tell me what you're building"
          />
        </label>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "loading"}
            className="border border-border/60 bg-background px-5 py-2 text-left text-[10px] tracking-[0.3em] text-warm-beige transition-colors hover:border-amber-dim hover:text-amber-glow hover:shadow-[0_0_18px_var(--control-glow)] disabled:cursor-not-allowed disabled:opacity-60"
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

      <div className="mt-8 grid gap-px bg-border/60 md:mt-12 md:grid-cols-2">
        {contactItems.map((c, i) => {
          const Icon = c.icon;
          const inner = (
            <>
              <div className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-amber-dim">
                <Icon className="h-3.5 w-3.5" />
                {c.label}
              </div>
              <div className="break-words font-mono text-sm text-warm-beige transition-colors group-hover:text-amber-glow">
                {c.value}
              </div>
            </>
          );

          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background"
            >
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group block bg-background p-6 transition-colors hover:bg-card/40 hover:shadow-[0_0_18px_var(--control-glow)]"
                >
                  {inner}
                </a>
              ) : (
                <div className="group block p-6">{inner}</div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-center font-mono text-[10px] tracking-[0.22em] text-warm-gray sm:tracking-[0.3em] md:mt-24 md:flex-row">
        <span>© 2026 SHABBIR DUDHIYA</span>
        <span className="cursor-blink">SYSTEM ONLINE</span>
      </div>
    </Section>
  );
}
