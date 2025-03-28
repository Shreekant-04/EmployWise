import { useState } from "react";
import api from "../axiosConfig";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

const UpdateBox = ({ user, setData, setShowUpdateBox }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.put(`api/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("User updated successfully");
        setData((prev) =>
          prev.map((u) =>
            u.id === user.id
              ? {
                  ...u,
                  first_name: firstName,
                  last_name: lastName,
                  email,
                  fullName: `${firstName} ${lastName}`,
                }
              : u
          )
        );
        setShowUpdateBox(false);
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen fixed bg-[#00000057] top-0 left-0 w-full flex justify-center items-center z-50"
      
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full sm:w-3/4 md:w-1/2 p-6 rounded-xl relative shadow-xl"
        style={{
          backgroundColor: "var(--color-surface)",
        }}
      >
        <button
          onClick={() => setShowUpdateBox(false)}
          className="absolute top-3 right-4 cursor-pointer"
          style={{ color: "var(--color-error)" }}
        >
          <IoClose size={28} />
        </button>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-24 h-24 rounded-full mb-2"
          />
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Update User
          </h2>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="mt-4 px-6 py-2 rounded-lg font-medium transition cursor-pointer"
            style={{
              backgroundColor: loading
                ? "var(--color-text-secondary)"
                : "var(--color-success)",
              color: "var(--color-surface)",
            }}
          >
            {loading ? "Updating..." : "Update"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
export default UpdateBox;
