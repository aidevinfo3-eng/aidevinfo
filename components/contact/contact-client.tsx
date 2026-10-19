'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Clock, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PageHeroBackdrop } from '@/components/shared/page-hero-backdrop';
import { SectionHeading } from '@/components/shared/section-heading';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { generalFaqs } from '@/lib/testimonials-faqs';
import {
  CONTACT_FORM_SUBJECTS,
  resolveContactSubjectFromQuery,
} from '@/lib/contact-subjects';

const CONTACT_EMAIL = 'aidevinfo3@gmail.com';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Usually within 24–48 hours',
    href: null as string | null,
  },
];

const emptyForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  botcheck: '',
};

function ContactForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const fromQuery = resolveContactSubjectFromQuery(searchParams.get('subject'));
    if (fromQuery) {
      setForm((prev) => (prev.subject === fromQuery ? prev : { ...prev, subject: fromQuery }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message.');
      }

      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="border border-border bg-card p-6 sm:p-8">
        <h2 className="font-display text-2xl text-foreground">Send a Message</h2>
        <p className="mt-1 text-sm text-muted-foreground">We typically reply within 24–48 hours.</p>

        {submitted ? (
          <div className="mt-6 flex items-center gap-3 border border-border bg-muted/40 p-4">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">Message sent successfully</p>
              <p className="text-sm text-muted-foreground">
                Thanks for reaching out. We&apos;ll get back to you soon.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={form.subject || undefined}
                onValueChange={(value) => setForm({ ...form, subject: value })}
                required
                disabled={loading}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_FORM_SUBJECTS.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us how we can help..."
                rows={6}
                required
                disabled={loading}
                className="resize-none"
              />
            </div>

            <input
              type="text"
              name="botcheck"
              value={form.botcheck}
              onChange={(e) => setForm({ ...form, botcheck: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {error && (
              <div className="flex items-start gap-2 border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full group" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              {!loading && (
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              )}
            </Button>
          </form>
        )}
      </div>

      <div className="space-y-4">
        <div className="border border-border bg-card p-6">
          <h3 className="font-display text-lg text-foreground">Contact Information</h3>
          <div className="mt-4 space-y-4">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border text-primary">
                  <info.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-sm font-medium text-foreground hover:text-primary"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactClient() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border bg-foreground">
        <PageHeroBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Breadcrumbs items={[{ label: 'Contact' }]} tone="light" className="mb-6" />
          <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-300/90">
            <MessageSquare className="h-3.5 w-3.5" />
            Get in Touch
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s Connect
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            Questions about AI tools, submitting your service, or advertising? Send a message
            below and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="border border-border bg-card p-8 text-sm text-muted-foreground">
              Loading form…
            </div>
          }
        >
          <ContactForm />
        </Suspense>
      </div>

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Quick answers to common questions about AI Dev Info."
          />
          <div className="mt-10">
            <FaqAccordion faqs={generalFaqs.slice(0, 6)} />
          </div>
        </div>
      </section>
    </div>
  );
}
