import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Target, TrendingUp, DollarSign } from 'lucide-react';

const AdvertisePage = () => {
  const packages = [
    {
      name: 'Basic',
      price: '₹5,000',
      period: 'per month',
      features: [
        'Banner ad on homepage',
        '100,000+ monthly impressions',
        'Mobile & desktop placement',
        'Basic analytics',
      ],
    },
    {
      name: 'Professional',
      price: '₹10,000',
      period: 'per month',
      features: [
        'All Basic features',
        'Category page placements',
        'Article sidebar ads',
        'Priority placement',
        'Detailed analytics',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'All Professional features',
        'Sponsored content',
        'Newsletter inclusion',
        'Custom campaigns',
        'Dedicated account manager',
      ],
    },
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Daily Readers' },
    { icon: Target, value: '13', label: 'Districts Reached' },
    { icon: TrendingUp, value: '50K+', label: 'Monthly Visitors' },
    { icon: DollarSign, value: '85%', label: 'Local Audience' },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black playfair tracking-tight leading-none mb-4" data-testid="advertise-title">
            Advertise With Live Point News
          </h1>
          <p className="text-lg text-muted-foreground">
            Reach thousands of engaged readers across Himachal Pradesh
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <stat.icon size={32} />
              </div>
              <div className="text-4xl font-black playfair text-primary mb-2">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Advertise */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold playfair text-center mb-12">Why Advertise With Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-border">
              <h3 className="text-xl font-bold mb-3">Targeted Local Audience</h3>
              <p className="text-muted-foreground">
                85% of our readers are from Himachal Pradesh. Reach customers in specific districts with 
                precision targeting.
              </p>
            </div>

            <div className="p-6 border border-border">
              <h3 className="text-xl font-bold mb-3">Trusted Platform</h3>
              <p className="text-muted-foreground">
                Readers trust Live Point News for accurate reporting. Your brand benefits from our credibility 
                and reputation.
              </p>
            </div>

            <div className="p-6 border border-border">
              <h3 className="text-xl font-bold mb-3">Engaged Readership</h3>
              <p className="text-muted-foreground">
                Our readers actively engage with content. High click-through rates and time-on-site metrics 
                mean better results for advertisers.
              </p>
            </div>

            <div className="p-6 border border-border">
              <h3 className="text-xl font-bold mb-3">Flexible Options</h3>
              <p className="text-muted-foreground">
                From banner ads to sponsored content, we offer various advertising formats to suit your 
                budget and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold playfair text-center mb-12">Advertising Packages</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`bg-white border-2 p-8 relative ${
                pkg.popular ? 'border-primary' : 'border-border'
              }`}
              data-testid={`package-${pkg.name.toLowerCase()}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                  Popular
                </div>
              )}
              <h3 className="text-2xl font-bold playfair mb-2">{pkg.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-primary">{pkg.price}</span>
                <span className="text-muted-foreground ml-2">{pkg.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                className={`block w-full py-3 text-center font-semibold rounded transition-colors duration-200 ${
                  pkg.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold playfair mb-4">Ready to Reach Your Audience?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Contact our advertising team to discuss custom packages and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors duration-200"
              data-testid="contact-sales-button"
            >
              Contact Sales
            </a>
            <a
              href="mailto:livepointnewstheog@gmail.com"
              className="px-8 py-3 bg-white text-foreground font-semibold rounded hover:bg-gray-100 transition-colors duration-200"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdvertisePage;