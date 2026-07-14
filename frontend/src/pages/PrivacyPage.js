import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-black playfair tracking-tight leading-none mb-8" data-testid="privacy-title">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-sm text-muted-foreground">Last updated: January 2026</p>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Live Point News ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit our website 
              livepoint.in and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Subscribe to our newsletter</li>
              <li>Submit a news tip or story</li>
              <li>Contact us through our contact form</li>
              <li>Comment on articles (if applicable)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              This information may include: name, email address, phone number, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you visit our website, we may automatically collect certain information about your device, including 
              information about your web browser, IP address, time zone, and some of the cookies installed on your device. 
              We may also collect information about your browsing behavior on our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Deliver our news content and services</li>
              <li>Send newsletters and news alerts (if subscribed)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Review and act upon news tips submitted by readers</li>
              <li>Improve our website and user experience</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">4. Sharing Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in 
              the following situations:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>With service providers who assist us in operating our website and conducting our business</li>
              <li>When required by law or to respond to legal process</li>
              <li>To protect our rights, property, or safety, or that of our users or the public</li>
              <li>In connection with a business transfer, merger, or acquisition</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
              Cookies are files with small amounts of data. You can instruct your browser to refuse all cookies or to indicate 
              when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">6. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content 
              of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">7. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. 
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to 
              use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">8. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Unsubscribe from our newsletters at any time</li>
              <li>Object to processing of your personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under the age of 13. We do not knowingly collect personal 
              information from children under 13. If you become aware that a child has provided us with personal information, 
              please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy 
              periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-muted p-6 rounded">
              <p className="text-muted-foreground">
                <strong>Live Point News</strong><br />
                Theog, Shimla, Himachal Pradesh<br />
                Email: livepointnewstheog@gmail.com<br />
                Website: livepoint.in
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;