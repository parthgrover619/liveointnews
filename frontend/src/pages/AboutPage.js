import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Users, Target, Heart } from 'lucide-react';

const AboutPage = () => {
  const values = [
    { icon: CheckCircle, title: 'Accuracy First', desc: 'Every story verified before publication' },
    { icon: Users, title: 'Community-Focused', desc: 'Stories that matter to Himachalis' },
    { icon: Target, title: 'Hyperlocal Coverage', desc: 'From every village to every city' },
    { icon: Heart, title: 'People Before Politics', desc: 'Unbiased, independent journalism' },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1628699543232-dc241b48a4b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxoaW1hY2hhbCUyMHByYWRlc2glMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MHx8fHwxNzg0MDMwODU5fDA&ixlib=rb-4.1.0&q=85"
          alt="Himachal Pradesh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black playfair tracking-tight leading-none text-white mb-4" data-testid="about-title">
              About Live Point News
            </h1>
            <p className="text-xl text-white/90">Trusted. Timely. Transparent.</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold playfair mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Live Point News was founded with a simple mission: to deliver fast, accurate, and unbiased news 
            to every corner of Himachal Pradesh. We believe that hyperlocal journalism matters. From Theog to 
            Kullu, from Shimla to Lahaul & Spiti, we're committed to being the voice of every district, 
            every community, and every story that shapes our beautiful state.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mt-4">
            In an age of sensationalism and clickbait, we stand for something different: journalism that 
            puts people before politics, facts before narratives, and truth before profits. Our team works 
            around the clock to bring you verified news that you can trust.
          </p>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="bg-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold playfair text-center mb-12">Why Trust Live Point News</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 border border-border text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold playfair mb-6">Our Story</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Born in Theog, Shimla, Live Point News emerged from a simple observation: Himachal Pradesh's 
            stories weren't being told with the depth and care they deserved. Too often, state news was 
            either ignored by national media or reduced to superficial coverage. We knew our communities 
            deserved better.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mt-4">
            Today, we're proud to serve thousands of readers across Himachal Pradesh and beyond. From 
            breaking political developments to local community achievements, from weather alerts to 
            cultural celebrations, we cover the stories that matter to you.
          </p>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold playfair mb-6">Our Editorial Standards</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
              <p className="text-muted-foreground">
                <strong>Verification First:</strong> Every story is fact-checked and verified through 
                multiple sources before publication.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
              <p className="text-muted-foreground">
                <strong>Unbiased Reporting:</strong> We maintain strict editorial independence and 
                report stories without political bias.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
              <p className="text-muted-foreground">
                <strong>Community Input:</strong> We actively encourage news tips and story ideas from 
                our readers to ensure comprehensive coverage.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
              <p className="text-muted-foreground">
                <strong>Transparency:</strong> We clearly label opinion pieces, sponsored content, and 
                advertisements to maintain reader trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold playfair mb-4">Join Our Mission</h2>
          <p className="text-lg mb-8">
            Have a story to share? Want to contribute? Get in touch with us.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded hover:bg-gray-100 transition-colors duration-200"
            data-testid="contact-cta-button"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;