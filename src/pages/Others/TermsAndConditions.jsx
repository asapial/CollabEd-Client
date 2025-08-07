import React from "react";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import { RiFileList3Line } from "react-icons/ri";

const TermsAndConditions = () => {
  return (
    <SectionContainer className=" customGradiant1 ">
      <section className="min-h-screen px-6 py-16 max-w-5xl mx-auto  text-base-content">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary flex justify-center items-center">
          <RiFileList3Line />Terms & Conditions
        </h1>

        <p className="text-center text-base-content/70 mb-10 max-w-2xl mx-auto">
          By accessing and using CollabEd, you agree to abide by the following
          terms and conditions.
        </p>

        <div className="space-y-10">
          {/* 1. Acceptance */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By registering, accessing, or using CollabEd, you confirm that you
              have read, understood, and agree to be bound by these Terms of
              Service. If you do not agree, please discontinue use of the
              platform.
            </p>
          </div>

          {/* 2. User Responsibilities */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              2. User Responsibilities
            </h2>
            <p>
              Users are responsible for maintaining the confidentiality of their
              account credentials. You must not engage in activities that
              disrupt or harm other users, the platform, or its content.
            </p>
          </div>

          {/* 3. Content Ownership */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              3. Content & Ownership
            </h2>
            <p>
              All user-submitted content (e.g., study sessions, materials)
              remains your property, but by uploading, you grant CollabEd a
              non-exclusive license to use it for educational and promotional
              purposes.
            </p>
          </div>

          {/* 4. Prohibited Use */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Prohibited Use</h2>
            <p>
              You agree not to misuse the platform by uploading harmful content,
              violating intellectual property laws, or impersonating others.
            </p>
          </div>

          {/* 5. Termination */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              5. Account Termination
            </h2>
            <p>
              CollabEd reserves the right to suspend or terminate accounts that
              violate these terms or pose a risk to the platform's integrity.
            </p>
          </div>

          {/* 6. Disclaimer */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              We strive to ensure accuracy and reliability, but CollabEd is not
              liable for any direct or indirect damages arising from the use of
              the platform.
            </p>
          </div>

          {/* 7. Changes to Terms */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">7. Changes to Terms</h2>
            <p>
              These terms may be updated at any time. Continued use of the
              platform after changes implies your acceptance of the new terms.
            </p>
          </div>

          {/* 8. Governing Law */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
            <p>
              These Terms & Conditions are governed by the laws of your local
              jurisdiction and any disputes shall be handled accordingly.
            </p>
          </div>

          {/* 9. Contact */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              9. Contact Information
            </h2>
            <p>
              For any questions or concerns regarding these Terms, contact us at{" "}
              <a
                href="mailto:support@collabed.com"
                className="text-secondary underline"
              >
                support@collabed.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default TermsAndConditions;
