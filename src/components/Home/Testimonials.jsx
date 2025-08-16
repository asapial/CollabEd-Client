import { useState, useEffect } from "react";
import SectionContainer from "../SectionContainer/SectionContainer";

const Testimonials = () => {
  const quotes = [
    {
      text: "CollabEd completely changed the way I learn. The collaborations are so engaging!",
      name: "Ayesha, Student",
    },
    {
      text: "I found amazing peers to study with. It feels like a global classroom.",
      name: "Rafiq, Developer",
    },
    {
      text: "Finally, a platform that makes online learning truly interactive!",
      name: "Nabila, Researcher",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <SectionContainer>
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Learners Say
      </h2>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xl italic text-base-content/80">
          “{quotes[current].text}”
        </p>
        <p className="mt-4 font-semibold text-primary">
          {quotes[current].name}
        </p>
      </div>
    </SectionContainer>
  );
};

export default Testimonials;
