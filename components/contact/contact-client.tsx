'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Send,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SectionHeading } from '@/components/shared/section-heading';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { generalFaqs } from '@/lib/testimonials-faqs';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@aidevinfo.online', href: 'mailto:hello@aidevinfo.online' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: null },
  { icon: Clock, label: 'Business Hours', value: 'Mon - Fri, 9AM - 6PM PST', href: null },
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

const subjects = ['General Inquiry', 'Tool Submission', 'Advertising', 'Partnership', 'Content Collaboration', 'Technical Support'];

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
          <Breadcrumbs items={[{ label: 'Contact' }]} className="mb-6" />
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground shadow-soft">
              <MessageSquare className="h-4 w-4 text-primary" />
              Get in Touch
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Let&apos;s Connect
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-balance">
              Have questions about AI tools, want to submit your service, or interested in advertising? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-border/60 shadow-card">
              <CardContent className="p-6 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-foreground">Send a Message</h2>
                <p className="mt-1 text-sm text-muted-foreground">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                {submitted ? (
                  <div className="mt-6 flex items-center gap-3 rounded-xl bg-success/10 p-4">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                    <div>
                      <p className="font-semibold text-foreground">Message sent successfully!</p>
                      <p className="text-sm text-muted-foreground">We&apos;ll get back to you soon.</p>
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
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={form.subject} onValueChange={(value) => setForm({ ...form, subject: value })}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
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
                        className="resize-none"
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full gradient-primary text-white shadow-glow hover:opacity-90 group">
                      Send Message
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact info */}
            <Card className="border-border/60 shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">Contact Information</h3>
                <div className="mt-4 space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <info.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="text-sm font-medium text-foreground hover:text-primary">
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social links */}
            <Card className="border-border/60 shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">Follow Us</h3>
                <p className="mt-1 text-sm text-muted-foreground">Stay connected on social media.</p>
                <div className="mt-4 flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-soft"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <Card className="overflow-hidden border-border/60 shadow-soft">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 via-accent/5 to-muted">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                  <MapPin className="h-10 w-10 text-primary/60" />
                  <p className="text-sm font-medium text-foreground">San Francisco, CA</p>
                  <p className="text-xs text-muted-foreground">Map placeholder — Google Maps integration ready</p>
                </div>
                <div className="absolute inset-0 opacity-30">
                  <div className="h-full w-full bg-[linear-gradient(0deg,transparent_48%,hsl(var(--border))_49%,hsl(var(--border))_51%,transparent_52%),linear-gradient(90deg,transparent_48%,hsl(var(--border))_49%,hsl(var(--border))_51%,transparent_52%)] bg-[size:40px_40px]" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="bg-muted/30 py-16">
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
