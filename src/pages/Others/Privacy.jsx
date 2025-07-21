import React from "react";

const Privacy = () => {
  return (
    <section className="min-h-screen px-6 py-16 max-w-5xl mx-auto bg-base-100 text-base-content">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Privacy Policy
      </h1>

      <p className="text-center text-base-content/70 mb-10 max-w-2xl mx-auto">
        This Privacy Policy explains how CollabEd collects, uses, and protects
        your information when you use our platform.
      </p>

      <div className="space-y-10">
        {/* Information Collection */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly, such as your name,
            email address, profile image, and session details. Additionally, we
            may collect usage data like device information, IP address, and
            interaction logs to improve your experience.
          </p>
        </div>

        {/* How We Use */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>
            Your data is used to personalize your experience, process your
            sessions, provide support, and improve platform performance. We do
            not sell or rent your data to third parties.
          </p>
        </div>

        {/* Data Sharing */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Data Sharing & Third-Party Services</h2>
          <p>
            We may share your data with trusted third-party services for
            authentication, analytics, and storage. All such services are
            compliant with relevant privacy regulations.
          </p>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We use secure servers, encryption protocols, and strict access
            control to protect your data. However, no system can guarantee 100%
            security.
          </p>
        </div>

        {/* Cookies */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Cookies</h2>
          <p>
            CollabEd uses cookies to improve user experience, remember user
            preferences, and analyze platform traffic.
          </p>
        </div>

        {/* Children's Policy */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Children’s Privacy</h2>
          <p>
            Our platform is not intended for children under 13. We do not
            knowingly collect personal data from minors without parental
            consent.
          </p>
        </div>

        {/* Changes */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We encourage
            users to review it regularly. Continued use of the platform means
            you agree to the updated terms.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, feel free to
            contact us at{" "}
            <a href="mailto:support@collabed.com" className="text-secondary underline">
              support@collabed.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
