import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Quote } from 'lucide-react';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: 'Rohit Sharma',
      location: 'Theog',
      text: 'Most reliable source for local news. I check Live Point News every morning for updates from my hometown.',
      rating: 5,
    },
    {
      name: 'Priya Verma',
      location: 'Shimla',
      text: 'Finally, unbiased news coverage from Himachal. The reporting is thorough and trustworthy. Keep up the great work!',
      rating: 5,
    },
    {
      name: 'Anil Kumar',
      location: 'Kullu',
      text: 'Fast and accurate reporting. Live Point News keeps us informed about what matters in our communities.',
      rating: 5,
    },
    {
      name: 'Meera Thakur',
      location: 'Mandi',
      text: 'As someone living outside Himachal, this is my go-to source for staying connected with home. Excellent coverage!',
      rating: 5,
    },
    {
      name: 'Rajesh Chauhan',
      location: 'Solan',
      text: 'Professional journalism at its best. Live Point News covers stories that mainstream media often misses.',
      rating: 5,
    },
    {
      name: 'Sunita Negi',
      location: 'Kangra',
      text: 'I love how they focus on local issues. The district-wise coverage is exactly what we needed.',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      location: 'Chamba',
      text: 'Trustworthy news without sensationalism. Live Point News respects its readers intelligence.',
      rating: 5,
    },
    {
      name: 'Kavita Devi',
      location: 'Hamirpur',
      text: 'Quick updates and detailed reporting. The newsletter alerts are very helpful for staying updated.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-black playfair tracking-tight leading-none mb-4" data-testid="testimonials-title">
          What Our Readers Say
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Hear from the communities we serve across Himachal Pradesh
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-border p-6 relative"
              data-testid={`testimonial-${index}`}
            >
              <Quote className="text-primary/20 absolute top-4 right-4" size={48} />
              <div className="relative z-10">
                <p className="text-muted-foreground italic mb-4 leading-relaxed">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-accent fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 border border-border p-12">
          <h2 className="text-3xl font-bold playfair text-center mb-12">Trusted by Thousands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black playfair text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Daily Readers</p>
            </div>
            <div>
              <div className="text-5xl font-black playfair text-primary mb-2">13</div>
              <p className="text-muted-foreground">Districts Covered</p>
            </div>
            <div>
              <div className="text-5xl font-black playfair text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Verified News</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold playfair mb-4">Want to Share Your Experience?</h2>
          <p className="text-muted-foreground mb-6">
            We'd love to hear from you. Your feedback helps us serve you better.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors duration-200"
            data-testid="contact-cta-button"
          >
            Contact Us
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;