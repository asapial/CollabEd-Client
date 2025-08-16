import React from "react";
import SectionContainer from "../SectionContainer/SectionContainer";

const successStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Computer Science Student",
    story:
      "CollabEd helped me connect with mentors and peers. I improved my coding skills and landed an internship!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "David Kim",
    role: "Software Engineer",
    story:
      "I collaborated on projects with amazing people through CollabEd. It boosted my portfolio significantly.",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Ayesha Khan",
    role: "Data Science Enthusiast",
    story:
      "The study groups and resources were top-notch. I got guidance that made learning data science fun.",
    image: "https://i.pravatar.cc/150?img=3",
  },
];

const SuccessStories = () => {
  return (
<SectionContainer>

      <h2 className="text-4xl font-bold text-center mb-8 text-primary">
        Success Stories
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {successStories.map((story) => (
          <div key={story.id} className="card bg-base-100 shadow-xl">
            <figure className="px-6 pt-6">
              <img
                src={story.image}
                alt={story.name}
                className="rounded-full w-24 h-24 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title">{story.name}</h3>
              <p className="text-sm opacity-70">{story.role}</p>
              <p className="mt-2">{story.story}</p>
            </div>
          </div>
        ))}
      </div>
    
</SectionContainer>
  );
};

export default SuccessStories;
