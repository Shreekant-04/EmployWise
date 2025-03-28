import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return navigate("/user");
    }
    navigate("/");
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen px-4 text-center"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col justify-center items-center"
      >
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: "var(--color-error)" }}
        >
          404
        </h1>
        <p
          className="text-2xl font-semibold mb-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          Page Not Found
        </p>
        <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>
          Oops! The page you are looking for does not exist.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="px-6 py-2 rounded-lg transition font-medium cursor-pointer"
          style={{
            backgroundColor: "var(--color-success)",
            color: "var(--color-surface)",
          }}
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
