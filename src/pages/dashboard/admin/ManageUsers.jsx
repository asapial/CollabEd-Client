import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserEdit, FaSearch } from "react-icons/fa";
import useFetchApi from "../../../Api/useFetchApi";
import { SuccessToast, ErrorToast } from "../../../utils/ToastMaker";

const ManageUsers = () => {
  const { getAllUsers, updateUserRole } = useFetchApi();
  const queryClient = useQueryClient();

  const [searchText, setSearchText] = useState(""); // controlled input

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", searchText], // make it reactive
    queryFn: () => getAllUsers(searchText),
  });

  const mutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      SuccessToast("Role updated successfully");
    },
    onError: () => ErrorToast("Failed to update role"),
  });

  const handleRoleChange = (id, newRole) => {
    mutation.mutate({ id, role: newRole });
  };

  return (
    <div className="min-h-screen px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Users</h2>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-2 max-w-md mx-auto">
        <div className="form-control w-full">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search by name or email"
              className="input input-bordered w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {/* <button
              className="btn btn-square btn-primary"
              onClick={() => queryClient.invalidateQueries(["users"])}
            >
              <FaSearch />
            </button> */}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra bg-base-100 rounded-box">
          <thead>
            <tr className="text-base-content/70">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.image || "https://via.placeholder.com/150"}
                            alt={user.userName || "User Avatar"}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.userName}</div>
                        
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.userRole}</td>
                  <td className="text-center">
                    <select
                      className="select select-bordered select-sm"
                      value={user.userRole}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value="Student">Student</option>
                      <option value="Tutor">Tutor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
