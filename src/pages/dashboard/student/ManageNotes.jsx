import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useFetchApi from "../../../Api/useFetchApi";
import { FaTrash, FaEdit, FaStickyNote } from "react-icons/fa";
import { SuccessToast, ErrorToast } from "../../../utils/ToastMaker";
import { AuthContext } from "../../../main";
import { Link } from "react-router";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import LoadingCenter from "../../Others/LoadingCenter";
import { MdDescription } from "react-icons/md";

const ManageNotes = () => {
  const { getMyNotes, deleteNote, updateNote } = useFetchApi();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [selectedNote, setSelectedNote] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["myNotes", user?.email],
    queryFn: () => getMyNotes(user.email),
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    deleteNote(id, user.email)
      .then(() => {
        SuccessToast("Note deleted");
        queryClient.invalidateQueries(["myNotes"]);
      })
      .catch(() => ErrorToast("Delete failed"));
  };

  const handleUpdate = (note) => {
    setSelectedNote(note);
    setUpdatedTitle(note.title);
    setUpdatedDescription(note.description);
    setShowModal(true);
  };

  const handleUpdateSubmit = () => {
    updateNote(
      selectedNote._id,
      {
        title: updatedTitle,
        description: updatedDescription,
      },
      user.email
    )
      .then(() => {
        SuccessToast("Note updated");
        queryClient.invalidateQueries(["myNotes"]);
        setShowModal(false);
      })
      .catch(() => ErrorToast("Update failed"));
  };

  return (
    <SectionContainer className=" customGradiant3 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-6 flex justify-center items-center gap-2">
        <FaStickyNote className="text-primary" />
        My Notes
      </h2>

      {isLoading ? (
        <LoadingCenter></LoadingCenter>
      ) : notes.length === 0 ? (
        <p className="text-center">You haven’t created any notes yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="card customGradiant2 rounded-2xl border-2 border-primary shadow-primary hover:shadow-sm transition-shadow duration-500"
            >
              <div className="card-body">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FaStickyNote className="text-primary" />
                  {note.title}
                </h3>

                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1 text-base font-semibold">
                    <MdDescription className="text-primary" />
                    Description
                  </div>
                  <div
                    className="text-sm opacity-80 prose max-w-full text-justify"
                    dangerouslySetInnerHTML={{ __html: note.description }}
                  ></div>
                </div>
                <div className="flex gap-3 mt-4 justify-end">
                  <Link to={`/studentDashboard/updateNote/${note._id}`}>
                    <button className="btn btn-sm btn-primary">
                      <FaEdit className="mr-1" /> Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Note</h3>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                rows={5}
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </div>

            <div className="modal-action">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleUpdateSubmit} className="btn btn-success">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default ManageNotes;
