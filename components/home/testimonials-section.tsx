'use client';

import { SectionHeading } from '@/components/shared/section-heading';
import { TestimonialCard } from '@/components/shared/testimonial-card';
import { testimonials } from '@/lib/testimonials-faqs';

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Community Says"
          description="Join thousands of developers, marketers, and AI enthusiasts who trust AI Dev Info."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
