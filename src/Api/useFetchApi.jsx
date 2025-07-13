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

  const createSession = (email,sessionData) => {
    return axiosSecure.post(`/createSession?email=${email}`, sessionData).then((res) => res.data);
  };

  const mySession=(email)=>{
    return axiosSecure.get(`/tutorMySessions?tutorEmail=${email}`).then((res) => res.data);
  }

  const resendApprovalRequest = (id) => {
    return axiosSecure.patch(`/updateSessionStatus?id=${id}`).then((res) => res.data);
  };





  return {
findTheUser,
postTheUser,
createSession,
mySession,
resendApprovalRequest

  };
};

export default useFetchApi;
