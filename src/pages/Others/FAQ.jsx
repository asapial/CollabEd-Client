import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import { FaQ } from "react-icons/fa6";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

const faqData = [
  {
    question: "What is CollabEd?",
    answer:
      "CollabEd is a collaborative learning platform that connects students and educators to share knowledge, host sessions, and grow together through interactive tools.",
  },
  {
    question: "How do I become a tutor on CollabEd?",
    answer:
      "Simply sign up and complete your tutor profile. Once verified, you can start creating sessions, sharing materials, and helping learners across the platform.",
  },
  {
    question: "Can I attend sessions for free?",
    answer:
      "Yes, many sessions are free! However, some premium or specialized sessions may require payment, which will be clearly shown before you register.",
  },
  {
    question: "How does CollabEd ensure session quality?",
    answer:
      "All sessions go through an approval process by admins. Feedback, ratings, and tutor performance are continuously monitored to ensure a high-quality learning experience.",
  },
  {
    question: "What happens if my session gets rejected?",
    answer:
      "You'll receive a rejection reason and feedback from the admin. You can edit your session and resend it for approval.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
<SectionContainer className=" customGradiant1">
      <section className="min-h-screen px-4 py-16 max-w-4xl mx-auto text-neutral">

<h1 className="text-4xl font-bold text-center mb-4 text-primary flex justify-center items-center gap-2">
  <FaQuestionCircle className="text-primary" />
  CollabEd FAQs
</h1>
      <p className="text-center text-base-content/70 mb-10 max-w-4xl mx-auto">
        Have questions? We’ve got answers. Explore some of the most commonly asked questions about CollabEd.
      </p>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="customGradiant2 boxCss"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 flex justify-between items-center text-left font-medium text-base-content focus:outline-none"
            >
              <span className="text-lg">{item.question}</span>
              {activeIndex === index ? (
                <FaChevronUp className="text-sm" />
              ) : (
                <FaChevronDown className="text-sm" />
              )}
            </button>

            <div
              className={`px-6 pb-5 text-base font-medium text-secondary transition-all duration-300 ease-in-out ${
                activeIndex === index ? "block" : "hidden"
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
</SectionContainer>
  );
};

export default FAQ;
