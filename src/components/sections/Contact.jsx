import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Send } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { fadeUp, staggerContainer, viewportOnce } from "@/animations/motionPresets";
import MagneticButton from "@/components/shared/MagneticButton";

// TODO: Get your free Access Key at https://web3forms.com
// Enter monicacubides.seguros@gmail.com there, and it will email you
// the key instantly. Paste it below. No dashboard, no extra setup.
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

export default function Contact() {
  const { contact } = portfolioData;
  const [form, setForm] = useState({ name: "", email: "", goal: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = contact.form.errorName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = contact.form.errorEmail;
    if (form.goal.trim().length < 3) next.goal = contact.form.errorGoal;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.goal,
          subject: `Nuevo contacto desde el portafolio - ${form.name}`,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error("Web3Forms request failed");

      setSubmitted(true);
      setForm({ name: "", email: "", goal: "" });
    } catch (err) {
      const subject = encodeURIComponent("Nuevo contacto desde el portafolio");
      const body = encodeURIComponent(
        `Nombre: ${form.name}\nCorreo: ${form.email}\nObjetivo: ${form.goal}`
      );
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setForm({ name: "", email: "", goal: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="section-pad relative">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow-pill mb-5">
            {contact.eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display text-balance text-2xl font-semibold leading-tight text-[color:var(--color-ink)] sm:text-4xl md:text-5xl"
          >
            {contact.headline}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-md text-balance text-sm leading-relaxed text-[color:var(--color-muted)] sm:mt-5 sm:text-lg"
          >
            {contact.text}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row"
          >
            <MagneticButton href={contact.whatsapp} magnetic={false}>
              <MessageCircle size={16} />
              {contact.whatsappLabel}
            </MagneticButton>
            <MagneticButton href={"mailto:" + contact.email} variant="ghost" magnetic={false}>
              <Mail size={16} />
              {contact.emailLabel}
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="card-panel-bold mt-10 p-6 text-left sm:mt-12 sm:p-9"
        >
          {submitted ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--color-accent-tint)" }}
              >
                <Send size={22} style={{ color: "var(--color-accent-dark)" }} />
              </div>
              <h3 className="font-display text-lg font-semibold text-[color:var(--color-ink)]">
                {contact.form.successTitle}
              </h3>
            </div>
          ) : (
            <>
              <h3 className="font-display text-lg font-semibold text-[color:var(--color-ink)] sm:text-xl">
                {contact.formTitle}
              </h3>
              <p className="mt-1.5 text-sm text-[color:var(--color-muted)]">{contact.formIntro}</p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[color:var(--color-ink)]">
                    {contact.form.nameLabel}
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder={contact.form.namePlaceholder}
                    className="h-12 w-full rounded-[var(--radius-sm)] border px-4 text-sm outline-none"
                    style={{ borderColor: "var(--color-border-strong)", backgroundColor: "var(--color-bg)", color: "var(--color-ink)" }}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[color:var(--color-ink)]">
                    {contact.form.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder={contact.form.emailPlaceholder}
                    className="h-12 w-full rounded-[var(--radius-sm)] border px-4 text-sm outline-none"
                    style={{ borderColor: "var(--color-border-strong)", backgroundColor: "var(--color-bg)", color: "var(--color-ink)" }}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="goal" className="mb-1.5 block text-sm font-medium text-[color:var(--color-ink)]">
                    {contact.form.goalLabel}
                  </label>
                  <textarea
                    id="goal"
                    rows={4}
                    value={form.goal}
                    onChange={handleChange("goal")}
                    placeholder={contact.form.goalPlaceholder}
                    className="w-full resize-none rounded-[var(--radius-sm)] border px-4 py-3 text-sm outline-none"
                    style={{ borderColor: "var(--color-border-strong)", backgroundColor: "var(--color-bg)", color: "var(--color-ink)" }}
                  />
                  {errors.goal && <p className="mt-1 text-xs text-red-500">{errors.goal}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: "var(--color-accent)", color: "var(--color-accent-ink)" }}
                >
                  {submitting ? contact.form.sendingLabel : contact.form.submitLabel}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}