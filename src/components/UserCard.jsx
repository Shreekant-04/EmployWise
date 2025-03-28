import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import api from "../axiosConfig";
import { toast } from "react-toastify";

const UserCard = ({ user, setData, setShowUpdateBox, setSelectedUser }) => {
  const [showMore, setShowMore] = useState(false);

  const handleDelete = async (id) => {
    setShowMore(false);
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirm) return;

      const response = await api.delete(`api/users/${id}`);
      if (response.status === 204) {
        toast.success("User deleted successfully");
        setData((prev) => prev.filter((user) => user.id !== id));
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Something went wrong");
    }
  };
  const handleEdit = () => {
    setShowMore(false);
    setSelectedUser(user);
    setShowUpdateBox(true);
  };

  return (
    <>
      <div className="relative bg-white rounded-2xl  shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
        <img
          src={user.avatar}
          alt={user.fullName}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-lg font-semibold">{user.fullName}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
        <div
          className="absolute top-4 right-4  cursor-pointer"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <IoMdMore size={22} />
        </div>
        {showMore && (
          <div className="absolute top-10 right-4  cursor-pointer flex flex-col p-2 bg-white rounded-lg shadow-sm">
            <div className="flex  items-center gap-1" onClick={handleEdit}>
              <span>
                <FaUserEdit />
              </span>
              <span>Edit</span>
            </div>

            <div
              className="flex  items-center gap-1"
              onClick={() => handleDelete(user.id)}
            >
              <span>
                <MdDelete color="red" />
              </span>
              <span>Delete</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default UserCard;
