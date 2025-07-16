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
      "Explore how AI is transforming classrooms. Join this interactive webinar with real-time Q&A.",
  },
  {
    id: 2,
    title: "Advanced JavaScript Workshop",
    tutor: "Sakib Mahmud",
    startTime: "July 22, 2025 - 8:30 PM",
    attendees: 95,
    description:
      "Deep dive into ES6+, async/await, closures, and design patterns with hands-on examples.",
  },
  {
    id: 3,
    title: "Figma Design Challenge",
    tutor: "Mitu Sultana",
    startTime: "July 25, 2025 - 5:00 PM",
    attendees: 80,
    description:
      "A live collaborative session where you design and iterate with peer feedback in real time.",
  },
];

const UpcomingLiveCollaborations = () => {
  return (
    <SectionContainer className="bg-base-200">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">🚀 Upcoming Live Collaborations</h2>
        <p className="text-base-content text-opacity-70 mt-2">
          Don’t miss out on live learning events hosted by top mentors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="card-body space-y-3">
              <h3 className="card-title text-lg">{session.title}</h3>
              <p className="flex items-center gap-2 text-sm text-base-content text-opacity-80">
                <FaChalkboardTeacher className="text-primary" />
                Tutor: {session.tutor}
              </p>
              <p className="flex items-center gap-2 text-sm text-base-content text-opacity-80">
                <FaClock className="text-accent" />
                Time: {session.startTime}
              </p>
              <p className="flex items-center gap-2 text-sm text-base-content text-opacity-80">
                <FaUsers className="text-secondary" />
                Registered: {session.attendees}
              </p>
              <p className="text-sm text-base-content text-opacity-80">
                {session.description}
              </p>
              <div className="card-actions justify-end pt-2">
                <button className="btn btn-sm btn-outline btn-primary">Join Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </SectionContainer>
  );
};

export default UpcomingLiveCollaborations;
