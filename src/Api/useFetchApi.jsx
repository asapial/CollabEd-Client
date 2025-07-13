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

  const approvedSessions = (email) => {
    return axiosSecure.get(`/approvedSessionsList?tutorEmail=${email}`).then((res) => res.data);
  };

  const uploadMaterials = (data) => {
    return axiosSecure.post(`/uploadMaterials`, data).then((res) => res.data);  
  }

  const getAllMaterials=(email)=>{
    return axiosSecure.get(`/getAllMaterials?tutorEmail=${email}`).then((res) => res.data); 
  }

  const getAllUsers = (search) => {
    return axiosSecure.get(`/getAllUsers?search=${search}`).then((res) => res.data);
  };

  const updateUserRole = (id, role) => {
    return axiosSecure.patch(`/updateUserRole?id=${id}&role=${role}`).then((res) => res.data);
  };

  const getAllSessions=()=>{
    return axiosSecure.get(`/getAllSessions`).then((res) => res.data);
  }

  const approveSession= (data) => {
    return axiosSecure.patch(`/approveSession`, data).then((res) => res.data);
  }

  const deleteSession= (id) => {
    return axiosSecure.delete(`/deleteSession?id=${id}`).then((res) => res.data);
  }

  const rejectSession = (id) => {
    return axiosSecure.patch(`/rejectSession?id=${id}`).then((res) => res.data);
  }





  return {
findTheUser,
postTheUser,
createSession,
mySession,
resendApprovalRequest,
approvedSessions,
uploadMaterials,
getAllMaterials,
getAllUsers,
updateUserRole,
getAllSessions,
approveSession,
deleteSession,
rejectSession


  };
};

export default useFetchApi;
