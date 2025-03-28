import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../axiosConfig";
import { motion } from "framer-motion";


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
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <img
        src={user.avatar}
        alt={user.fullName}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2
        className="text-lg font-semibold"
        style={{ color: "var(--color-text-primary)" }}
      >
        {user.fullName}
      </h2>
      <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
        {user.email}
      </p>
      <div
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => setShowMore((prev) => !prev)}
        style={{ color: "var(--color-icon)" }}
      >
        <IoMdMore size={22} />
      </div>

      {showMore && (
        <div
          className="absolute top-10 right-4 cursor-pointer flex flex-col p-2 rounded-lg shadow-sm"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <div
            className="flex items-center gap-1 hover:opacity-80 transition"
            onClick={handleEdit}
            style={{ color: "var(--color-primary)" }}
          >
            <span>
              <FaUserEdit />
            </span>
            <span>Edit</span>
          </div>

          <div
            className="flex items-center gap-1 mt-2 hover:opacity-80 transition"
            onClick={() => handleDelete(user.id)}
            style={{ color: "var(--color-error)" }}
          >
            <span>
              <MdDelete />
            </span>
            <span>Delete</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default UserCard;
