'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PageHeroBackdrop } from '@/components/shared/page-hero-backdrop';
import { FaqAccordion } from '@/components/shared/faq-accordion';
import { CTASection } from '@/components/shared/cta-section';

const stats = [
  { value: '5,000+', label: 'AI Tools Listed' },
  { value: '250+', label: 'Expert Articles' },
  { value: '150+', label: 'AI Categories' },
  { value: '100+', label: 'Satisfied Clients' },
  { value: '20K+', label: 'Monthly Readers' },
  { value: '99%', label: 'Positive Feedback' },
];

const whatWeDo = [
  {
    title: 'AI Development',
    description:
      'Build custom AI applications, chatbots, AI agents, automation systems, SaaS platforms, and enterprise AI solutions tailored to your business.',
  },
  {
    title: 'AI Tools Directory',
    description:
      'Explore thousands of carefully curated AI tools across hundreds of categories with detailed information and comparisons.',
  },
  {
    title: 'AI Learning Hub',
    description:
      'Access expert-written blogs, tutorials, implementation guides, comparisons, and industry news to stay ahead in AI.',
  },
  {
    title: 'Sponsored Advertising',
    description:
      'Promote your AI products, SaaS platforms, services, or startup to a targeted audience through featured listings and advertising opportunities.',
  },
  {
    title: 'AI Consulting',
    description:
      'Receive strategic consulting services that help businesses adopt AI technologies and improve operational efficiency.',
  },
  {
    title: 'AI Research',
    description:
      'Stay informed with the latest AI research, technology trends, product launches, and industry insights.',
  },
];

const whyChoose = [
  {
    title: 'Verified Resources',
    description:
      'Every AI tool and service listed on our platform is carefully reviewed for quality and relevance.',
  },
  {
    title: 'Expert Team',
    description:
      'Our specialists have expertise in AI development, automation, SEO, and digital transformation.',
  },
  {
    title: 'Daily Updates',
    description:
      'We continuously publish new AI tools, articles, tutorials, and industry news.',
  },
  {
    title: 'Transparent Reviews',
    description:
      'We provide unbiased information and practical insights to help users make informed decisions.',
  },
  {
    title: 'Community Focused',
    description:
      'Our growing community includes developers, founders, marketers, researchers, and AI enthusiasts from around the world.',
  },
  {
    title: 'Results Driven',
    description:
      'We focus on practical AI solutions that deliver measurable business outcomes.',
  },
];

const values = [
  {
    title: 'Innovation',
    description:
      'We embrace emerging technologies and continuously explore new possibilities in artificial intelligence.',
  },
  {
    title: 'Transparency',
    description:
      'We believe in honest recommendations, clear communication, and unbiased information.',
  },
  {
    title: 'Quality',
    description:
      'Every resource, service, and article is created with accuracy, reliability, and real-world value.',
  },
  {
    title: 'Community',
    description:
      'We believe knowledge grows stronger when shared with a supportive community.',
  },
  {
    title: 'Trust',
    description:
      'We build long-term relationships through reliability, professionalism, and integrity.',
  },
  {
    title: 'Growth',
    description:
      'We help businesses and individuals unlock new opportunities through AI innovation.',
  },
];

const team = [
  {
    name: 'Zainab Ghafoor',
    role: 'Founder & CEO',
    bio: 'Leading the vision and strategy behind AI Dev Info while driving innovation in AI solutions and digital growth.',
  },
  {
    name: 'Areeb Hassan',
    role: 'Lead AI Engineer',
    bio: 'Specializes in AI application development, LLM integration, automation, and scalable AI systems.',
  },
  {
    name: 'Fatima Khan',
    role: 'AI Content Lead',
    bio: 'Creates educational resources, tutorials, and research-based AI content.',
  },
  {
    name: 'David Kim',
    role: 'Machine Learning Engineer',
    bio: 'Focuses on predictive models, data science, and intelligent automation.',
  },
  {
    name: 'Jessica Martinez',
    role: 'UI/UX Designer',
    bio: 'Designs modern user experiences that make AI platforms intuitive and engaging.',
  },
  {
    name: 'Michael Brown',
    role: 'Marketing Manager',
    bio: 'Leads brand strategy, partnerships, and AI product marketing initiatives.',
  },
];

const processSteps = [
  {
    title: 'Discover',
    description: 'We understand your goals, challenges, and business requirements.',
  },
  {
    title: 'Plan',
    description: 'We define a clear strategy, roadmap, and AI implementation plan.',
  },
  {
    title: 'Develop',
    description: 'Our experts build scalable, secure, and intelligent AI solutions.',
  },
  {
    title: 'Test',
    description: 'Every solution is thoroughly tested for performance, security, and reliability.',
  },
  {
    title: 'Deploy',
    description: 'We launch and integrate AI solutions seamlessly into your workflow.',
  },
  {
    title: 'Support',
    description: 'Continuous optimization, maintenance, and long-term support.',
  },
];

const industries = [
  'Startups',
  'Small Businesses (SMEs)',
  'Enterprises',
  'Developers',
  'Agencies',
  'Educators',
  'Content Creators',
  'Marketing Teams',
];

const caseStudies = [
  {
    title: 'Healthcare AI Assistant',
    result:
      'Improved patient response time by 65% through AI-powered automation and intelligent support systems.',
  },
  {
    title: 'AI Automation Platform',
    result: 'Reduced manual processes and operational costs by 40% using workflow automation.',
  },
  {
    title: 'AI Customer Support Chatbot',
    result: 'Provided 24/7 customer assistance and increased customer satisfaction by 70%.',
  },
  {
    title: 'AI Analytics Dashboard',
    result: 'Enhanced reporting accuracy and improved decision-making efficiency by 55%.',
  },
];

const partners = [
  { name: 'OpenAI', src: '/logos/openai.svg' },
  { name: 'Microsoft', src: '/logos/microsoft.svg' },
  { name: 'Google Cloud', src: '/logos/google.svg' },
  { name: 'Amazon Web Services', src: '/logos/aws.svg' },
  { name: 'Anthropic', src: '/logos/anthropic.svg' },
  { name: 'Hugging Face', src: '/logos/huggingface.svg' },
  { name: 'Meta AI', src: '/logos/meta.svg' },
  { name: 'NVIDIA', src: '/logos/nvidia.svg' },
];

const testimonials = [
  {
    quote:
      'AI Dev Info helped us discover the perfect AI stack and guided us through implementing a chatbot solution that exceeded our expectations.',
    name: 'Sarah Johnson',
    role: 'CEO, TechVision',
  },
  {
    quote:
      'Their AI consulting services helped us reduce development time and launch our product faster.',
    name: 'Michael Lee',
    role: 'CTO, Innovate Labs',
  },
  {
    quote:
      'One of the most valuable AI platforms for discovering tools, learning resources, and trusted development services.',
    name: 'Emily Carter',
    role: 'Founder, AI Startup',
  },
];

const aboutFaqs = [
  {
    question: 'What is AI Dev Info?',
    answer:
      'AI Dev Info is a platform that combines AI services, AI tools, educational resources, expert insights, and business promotion opportunities.',
  },
  {
    question: 'Do you develop custom AI solutions?',
    answer:
      'Yes. We specialize in AI chatbots, AI agents, automation systems, custom AI applications, SaaS products, and LLM integrations.',
  },
  {
    question: 'Can I advertise my AI business?',
    answer:
      'Absolutely. We provide sponsored listings, featured articles, banner advertising, and promotional campaigns for AI companies.',
  },
  {
    question: 'How often is your platform updated?',
    answer:
      'Our directory, articles, tutorials, and AI resources are updated regularly to ensure users always have access to the latest information.',
  },
  {
    question: 'Do you review AI tools?',
    answer:
      'Yes. We evaluate AI tools based on usability, features, pricing, performance, and overall value to help users make informed decisions.',
  },
];

export function AboutClient() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border bg-foreground">
        <PageHeroBackdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <Breadcrumbs
            items={[{ label: 'About Us' }]}
            tone="light"
            className="mb-6"
          />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-300/90">
            About AI Dev Info
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-5xl">
            Building the Future of AI Through Innovation, Knowledge & Technology
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            AI Dev Info is a complete AI ecosystem that empowers businesses, developers,
            startups, marketers, and creators to discover the best AI tools, build
            intelligent AI solutions, learn from expert-written resources, and promote
            innovative AI products. We combine technology, education, and innovation to
            make artificial intelligence accessible for everyone.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white text-foreground hover:bg-white/90 group"
            >
              <Link href="/services">
                Explore AI Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-foreground"
            >
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-white/60">
            Trusted by thousands of businesses & AI professionals worldwide ·{' '}
            <span className="text-white">20,000+ happy users</span>
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Our Journey"
                title="Our Story"
                center={false}
                className="max-w-md"
              />
            </div>
            <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base lg:col-span-7">
              <p>
                AI Dev Info was founded with one clear vision: to create a trusted platform
                where businesses and individuals can discover, learn, build, and grow with
                artificial intelligence.
              </p>
              <p>
                As AI technology rapidly transforms industries around the world, finding
                reliable AI tools, professional development services, and educational
                resources has become increasingly difficult. We built AI Dev Info to solve
                this challenge by bringing everything together into one centralized platform.
              </p>
              <p>
                Today, AI Dev Info is more than a directory. It is a growing AI ecosystem
                that connects businesses with AI services, developers with learning
                resources, startups with promotional opportunities, and professionals with
                the latest AI innovations.
              </p>
              <p>
                Our goal is to simplify AI adoption by making advanced technologies easier
                to understand, easier to implement, and more valuable for businesses of
                every size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-border bg-background p-6 sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                Mission
              </p>
              <h2 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
                Our Mission
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Our mission is to simplify AI adoption by connecting people with trusted AI
                services, verified AI tools, educational resources, and expert guidance that
                help organizations innovate and grow.
              </p>
            </div>
            <div className="border border-border bg-background p-6 sm:p-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                Vision
              </p>
              <h2 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
                Our Vision
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Our vision is to become one of the world&apos;s most trusted AI platforms
                where businesses, developers, startups, and creators discover, build, and
                grow with artificial intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Everything You Need to Succeed with AI"
            description="We provide a complete ecosystem of AI services, educational resources, and business solutions to help organizations leverage artificial intelligence with confidence."
            center={false}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.map((item, index) => (
              <div key={item.title} className="border border-border p-6">
                <p className="text-[11px] font-medium tabular-nums text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="By The Numbers"
            title="AI Dev Info in Numbers"
            center={false}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-border bg-background p-6">
                <p className="font-display text-3xl text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Us"
            title="Your Trusted AI Partner"
            center={false}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item) => (
              <div key={item.title} className="border border-border p-6">
                <h3 className="font-display text-xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Principles" title="Our Core Values" center={false} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="border border-border bg-background p-6">
                <h3 className="font-display text-xl text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Team"
            title="Meet the People Behind AI Dev Info"
            center={false}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="border border-border p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
                  {member.role}
                </p>
                <h3 className="mt-3 font-display text-xl text-foreground">{member.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How We Work"
            title="Our Simple Process to Deliver Powerful AI Solutions"
            center={false}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <div key={step.title} className="border border-border bg-background p-6">
                <p className="text-[11px] font-medium tabular-nums text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-xl text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Industries"
            title="AI Solutions for Every Industry"
            description="We proudly work with organizations across multiple industries, helping them adopt AI to solve real-world challenges."
            center={false}
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="border border-border px-4 py-2.5 text-sm text-foreground"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Results"
            title="Real Results with AI"
            center={false}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {caseStudies.map((study) => (
              <div key={study.title} className="border border-border bg-background p-6">
                <h3 className="font-display text-xl text-foreground">{study.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {study.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Partners"
            title="Powered by Leading Technology Partners"
          />
        </div>

        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-20" />

          <div className="flex w-max animate-marquee gap-10 pe-10 motion-reduce:animate-none sm:gap-14 sm:pe-14 hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="flex shrink-0 items-center gap-2.5 text-foreground/55"
                title={partner.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.src}
                  alt=""
                  aria-hidden
                  className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
                />
                <span className="whitespace-nowrap font-display text-xl sm:text-2xl">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-card py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Testimonials" title="Loved by AI Builders" center={false} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote key={item.name} className="border border-border bg-background p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-5">
                  <p className="font-display text-lg text-foreground">{item.name}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {item.role}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description="Quick answers about AI Dev Info and how we help."
          />
          <div className="mt-10">
            <FaqAccordion faqs={aboutFaqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CTASection
            title="Ready to Build the Future with AI?"
            description="Join thousands of businesses, developers, and AI enthusiasts who trust AI Dev Info to discover powerful AI tools, build innovative solutions, and stay informed with expert insights."
            primaryLabel="Explore AI Services"
            primaryHref="/services"
            secondaryLabel="Contact Us"
            secondaryHref="/contact"
          />
        </div>
      </section>
    </div>
  );
}
