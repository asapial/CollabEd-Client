import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserEdit, FaSearch, FaUsersCog } from "react-icons/fa";
import useFetchApi from "../../../Api/useFetchApi";
import { SuccessToast, ErrorToast } from "../../../utils/ToastMaker";
import { AuthContext } from "../../../main";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

const ManageUsers = () => {
  const { getAllUsers, updateUserRole } = useFetchApi();
  const queryClient = useQueryClient();
  const {user} = useContext(AuthContext);

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // items per page

  const { data = {}, isLoading } = useQuery({
    queryKey: ["users", searchText, currentPage],
    queryFn: () => getAllUsers(searchText, currentPage, limit,user.email),
    keepPreviousData: true,
  });

  const users = data.users || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  const mutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role,user.email),
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
<SectionContainer className="customGradiant3">

      <h2 className="text-4xl font-bold text-center mb-6 flex justify-center items-center text-green-500"><FaUsersCog />Manage Users</h2>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-2 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1); // reset to first page on new search
          }}
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border border-primary rounded-2xl">
        <table className="table table-zebra bg-base-100 rounded-box">
          <thead className="bg-primary/10">
            <tr className="text-base">
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
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`btn btn-sm ${
                currentPage === num ? "btn-primary" : "btn-outline"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
</SectionContainer>
  );
};

export default ManageUsers;
