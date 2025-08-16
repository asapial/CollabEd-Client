import React from "react";

const CommunityHighlights = () => {
  const highlights = [
    {
      id: 1,
      title: "Hackathon Winners 🎉",
      description:
        "Our community members built an AI-powered study assistant and won the recent EdTech Hackathon.",
      image: "https://www.coursesonline.co.uk/wp-content/uploads/Subject-Programming.jpeg?height=485&dpr=2",
    },
    {
      id: 2,
      title: "Top Collaborators 🤝",
      description:
        "Meet Sarah & John who completed 15+ study sessions together and helped others achieve their goals.",
      image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/1e5sV3pmPjp5Bk8uhLlPSw/ee99dfc20f7b622c9217003efc9c4fdc/GettyImages-1332378553__2_.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000",
    },
    {
      id: 3,
      title: "Monthly Meetup 📅",
      description:
        "Over 120 learners joined our online meetup to share learning resources and future collaboration ideas.",
      image: "https://s3-us-west-2.amazonaws.com/courses-images/wp-content/uploads/sites/1972/2017/07/04174910/HackTX_2012_Student_programmers_working.jpg",
    },
  ];

  return (
    <div className="py-12 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Community Highlights
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityHighlights;
