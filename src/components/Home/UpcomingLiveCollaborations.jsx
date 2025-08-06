import React from "react";
import { FaChalkboardTeacher, FaClock, FaUsers } from "react-icons/fa";
import SectionContainer from "../SectionContainer/SectionContainer";

const upcomingSessions = [
  {
    id: 1,
    title: "AI in Education - Live Session",
    tutor: "Dr. Farhana Akter",
    startTime: "July 20, 2025 - 7:00 PM",
    attendees: 120,
    description:
      "Discover the transformative impact of Artificial Intelligence in modern education. This interactive webinar will explore cutting-edge AI tools and techniques that enhance personalized learning, automate administrative tasks, and improve student engagement. Join Dr. Farhana Akter for a deep dive into real-world case studies, followed by an engaging live Q&A to answer your pressing questions.",
  },
  {
    id: 2,
    title: "Advanced JavaScript Workshop",
    tutor: "Sakib Mahmud",
    startTime: "July 22, 2025 - 8:30 PM",
    attendees: 95,
    description:
      "Master the latest features of JavaScript ES6+ in this in-depth workshop designed for developers aiming to level up. Learn about asynchronous programming with async/await, understand closures and lexical scope, and explore powerful design patterns that improve code maintainability and performance. Participate in hands-on coding exercises and get personalized feedback from Sakib Mahmud.",
  },
  {
    id: 3,
    title: "Figma Design Challenge",
    tutor: "Mitu Sultana",
    startTime: "July 25, 2025 - 5:00 PM",
    attendees: 80,
    description:
      "Engage in a dynamic and creative live session focused on UI/UX design using Figma. Collaborate with peers to design, prototype, and iterate your ideas in real time. Gain practical experience with design systems, component libraries, and user-centric workflows, while receiving constructive feedback from Mitu Sultana and fellow participants. Perfect for those looking to enhance their design portfolio and teamwork skills.",
  },
];


const UpcomingLiveCollaborations = () => {
  return (
    <SectionContainer className="bg-base-200">
      <div className="text-center mb-10">
        <h2 className="text-4xl text-primary font-bold">🚀 Upcoming Live Collaborations</h2>
        <p className="text-base-content text-opacity-70 mt-2">
          Don’t miss out on live learning events hosted by top mentors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl"
          >
            <div className="card-body space-y-3">
              <h3 className="card-title text-xl">{session.title}</h3>
              <p className="flex items-center gap-2 text-lg text-base-content text-opacity-80">
                <FaChalkboardTeacher className="text-primary" />
                Tutor: {session.tutor}
              </p>
              <p className="flex items-center gap-2 text-lg text-base-content text-opacity-80">
                <FaClock className="text-accent" />
                Time: {session.startTime}
              </p>
              <p className="flex items-center gap-2 text-lg text-base-content text-opacity-80">
                <FaUsers className="text-secondary" />
                Registered: {session.attendees}
              </p>
              <p className="text-base text-justify ">
                {session.description}
              </p>
              <div className="card-actions justify-center pt-2">
                <button className="btn btn-wide btn-outline btn-primary">Join Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </SectionContainer>
  );
};

export default UpcomingLiveCollaborations;
