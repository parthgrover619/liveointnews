import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-black playfair tracking-tight leading-none mb-8" data-testid="terms-title">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-sm text-muted-foreground">Last updated: January 2026</p>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Live Point News. By accessing and using our website (livepoint.in) and services, you agree to be 
              bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">2. Use of Our Service</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 License</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We grant you a limited, non-exclusive, non-transferable license to access and use our website for personal, 
              non-commercial purposes.
            </p>

            <h3 className="text-xl font-semibold mb-3">2.2 Prohibited Uses</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Use our website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the website or servers</li>
              <li>Reproduce, duplicate, or copy content without permission</li>
              <li>Use automated systems to access the website without consent</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">3. Content and Intellectual Property</h2>
            <h3 className="text-xl font-semibold mb-3">3.1 Our Content</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All content on Live Point News, including articles, images, videos, logos, and design, is owned by Live Point News 
              or our content suppliers and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.2 User-Submitted Content</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you submit news tips, comments, or other content to our website, you grant us a worldwide, non-exclusive, 
              royalty-free license to use, reproduce, modify, and publish that content. You represent that you own or have the 
              necessary rights to the content you submit.
            </p>

            <h3 className="text-xl font-semibold mb-3">3.3 Copyright Infringement</h3>
            <p className="text-muted-foreground leading-relaxed">
              We respect intellectual property rights. If you believe your copyright has been infringed, please contact us with 
              details of the alleged infringement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">4. Accuracy and Editorial Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We strive to provide accurate, reliable, and timely news. However:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>We do not guarantee the accuracy, completeness, or timeliness of any content</li>
              <li>News content may be updated or corrected as new information becomes available</li>
              <li>Opinions expressed in opinion pieces are those of the authors and do not necessarily reflect our views</li>
              <li>We reserve the right to edit, modify, or remove content at our discretion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">5. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you create an account with us (e.g., for newsletter subscription), you are responsible for maintaining the 
              confidentiality of your account information and for all activities under your account. You agree to notify us 
              immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">6. Third-Party Links and Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites or services. We are not responsible for the content, 
              privacy practices, or terms of service of these external sites. Your interactions with third-party sites are 
              at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website and services are provided "as is" without warranties of any kind, either express or implied. We do 
              not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, Live Point News shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or 
              any loss of data, use, goodwill, or other intangible losses resulting from your use of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">9. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold harmless Live Point News, its officers, directors, employees, and agents from any 
              claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our website or 
              violation of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">10. Advertising</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may display advertisements on our website. We are not responsible for the content of advertisements or the 
              practices of advertisers. Your dealings with advertisers are solely between you and the advertiser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">11. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. 
              Your continued use of the website after changes are posted constitutes your acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising 
              from these terms shall be subject to the exclusive jurisdiction of the courts in Shimla, Himachal Pradesh.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">13. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to terminate or suspend your access to our website at our discretion, without notice, for 
              conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for 
              any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">14. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-muted p-6 rounded">
              <p className="text-muted-foreground">
                <strong>Live Point News</strong><br />
                Shop No 14, New Bus Stand<br />
                Theog, Shimla, Himachal Pradesh<br />
                Email: livepointnewstheog@gmail.com<br />
                Website: livepoint.in
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold playfair mb-4">15. Severability</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited 
              or eliminated to the minimum extent necessary so that these terms shall otherwise remain in full force and effect.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;