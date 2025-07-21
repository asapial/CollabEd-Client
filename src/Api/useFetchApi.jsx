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

const getAllUsers = (search = "", page = 1, limit = 10) => {
  return axiosSecure
    .get(`/getAllUsers?search=${search}&page=${page}&limit=${limit}`)
    .then((res) => res.data);
};


  const updateUserRole = (id, role) => {
    return axiosSecure.patch(`/updateUserRole?id=${id}&role=${role}`).then((res) => res.data);
  };

const getAllSessions = (page = 1, limit = 6) => {
  return axiosSecure
    .get(`/getAllSessions?page=${page}&limit=${limit}`)
    .then((res) => res.data);
};

  const approveSession= (data) => {
    return axiosSecure.patch(`/approveSession`, data).then((res) => res.data);
  }

  const deleteSession= (id) => {
    return axiosSecure.delete(`/deleteSession?id=${id}`).then((res) => res.data);
  }

  const rejectSession = (id) => {
    return axiosSecure.patch(`/rejectSession?id=${id}`).then((res) => res.data);
  }


 const getAllMaterialsAdmin =()=>{
    return axiosSecure.get(`/getAllMaterialsAdmin`).then((res) => res.data);
 }

 const deleteMaterial = (id) => {
    return axiosSecure.delete(`/deleteMaterial?id=${id}`).then((res) => res.data);
  }

  const createNote = (noteData) => {
  return axiosSecure.post("/createNote", noteData).then((res) => res.data);
};

const getMyNotes= (email) => {
  return axiosSecure.get(`/getMyNotes?email=${email}`).then((res) => res.data);
};

const deleteNote = (id) => {
  return axiosSecure.delete(`/deleteNote?id=${id}`).then((res) => res.data);
};

const getNoteById = (id) => {
  return axiosSecure.get(`/getNoteById/${id}`).then((res) => res.data);
};

const updateNoteById = (id, noteData) => {
  return axiosSecure.patch(`/updateNote/${id}`, noteData).then((res) => res.data);
};
const getSixSessions = () => {
  return axiosSecure.get("/getSixSessions").then((res) => res.data);
};

const getAllSessionsGeneral = () => {
  return axiosSecure.get("/getAllSessionsGeneral").then((res) => res.data);
};

const getSessionById = (id) => {
    return axiosSecure.get(`/getSessionById/${id}`).then((res) => res.data);
};
const bookSession = (bookingData) => {
  return axiosSecure.post("/bookSession", bookingData).then((res) => res.data);
}
const getMyBookedSessions = (email) => {
  return axiosSecure.get(`/getMyBookedSessions?email=${email}`).then((res) => res.data);
};

const postReview = (data) => {
  return axiosSecure.patch("/postReview", data).then((res) => res.data);
};

const getSessionReviews=(id)=>{
  return axiosSecure.get(`/getSessionReviews?id=${id}`).then((res) => res.data);
}

const fetchTutors=()=>{
  return axiosSecure.get(`/allTutors`).then((res) => res.data);
}

const getStudentMaterials = (email) => {
  return axiosSecure.get(`/studentMaterials?email=${email}`).then((res) => res.data);
};




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
rejectSession,
getAllMaterialsAdmin,
deleteMaterial,
createNote,
getMyNotes,
deleteNote,
getNoteById,
updateNoteById,
getSixSessions,
getAllSessionsGeneral,
getSessionById,
bookSession,
getMyBookedSessions,
postReview,
getSessionReviews,
fetchTutors,
getStudentMaterials


  };
};

export default useFetchApi;
