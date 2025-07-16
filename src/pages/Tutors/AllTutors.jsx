import React from "react";
import { useQuery } from "@tanstack/react-query";

import { FaGraduationCap, FaEnvelope } from "react-icons/fa";
import useFetchApi from "../../Api/useFetchApi";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import Loading from "../Others/Loading";




const AllTutors = () => {
    const {fetchTutors}=useFetchApi();
  const { data: tutors = [], isLoading} = useQuery({
    queryKey: ["tutors"],
    queryFn: ()=> fetchTutors(),
  });

  if (isLoading){
    return <Loading></Loading>
  }



  return (
    <SectionContainer>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-2">
          <FaGraduationCap className="text-primary" />
          Meet Our Tutors
        </h2>
        <p className="text-base-content text-opacity-70 max-w-xl mx-auto mt-2">
          Learn from experienced and dedicated educators from diverse subjects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="rounded-xl border shadow-md bg-base-100 hover:shadow-xl transition duration-300"
          >
            <figure className="w-full h-48 overflow-hidden rounded-t-xl">
              <img
                src={tutor.image}
                alt={tutor.userName}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold">{tutor.userName}</h3>
              <div className="flex items-center gap-2 text-sm text-base-content text-opacity-80">
                <FaEnvelope className="text-primary" />
                <span>{tutor.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </SectionContainer>
  );
};

export default AllTutors;
