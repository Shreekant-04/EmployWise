import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import api from "../axiosConfig";

const Login = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("api/login", formData);
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successfully");
        nav("/user");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      nav("/user");
    }
  }, [token, nav]);

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <motion.div
        className="w-full max-w-md p-8 rounded-2xl shadow-xl"
        style={{ backgroundColor: "var(--color-surface)" }}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="flex justify-center items-center gap-2 text-3xl font-extrabold"
          style={{ color: "var(--color-text-primary)" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span>EmployWise</span>
          <img
            src="favicon.png"
            alt="icon"
            title="Image showing a group of people"
            className="w-8 h-8"
          />
        </motion.h1>

        <motion.h2
          className="text-xl font-semibold text-center mt-4"
          style={{ color: "var(--color-text-secondary)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Welcome Back
        </motion.h2>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-text-secondary)",
                backgroundColor: "var(--color-surface)",
              }}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--color-text-secondary)",
                backgroundColor: "var(--color-surface)",
              }}
              placeholder="Enter your password"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium transition-all ${
              loading ? "cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor: loading
                ? "var(--color-primary-dark)"
                : "var(--color-primary)",
              color: "var(--color-surface)",
            }}
            whileHover={{ scale: !loading ? 1.05 : 1 }}
            whileTap={{ scale: !loading ? 0.95 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
