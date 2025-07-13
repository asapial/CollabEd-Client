import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";


const useFetchApi = () => {
  const axiosSecure = useAxiosSecure();

  const findTheUser = (email) => {
    return axiosSecure.get(`/findTheUser?email=${email}`).then((res) => res.data);
  };
  const postTheUser = (email,data) => {
    return axiosSecure.post(`/postTheUser?email=${email}`,data).then((res) => res.data);
  };

  const createSession = (sessionData) => {
    return axiosSecure.post("/createSession", sessionData).then((res) => res.data);
  };





  return {
findTheUser,
postTheUser,
createSession

  };
};

export default useFetchApi;
