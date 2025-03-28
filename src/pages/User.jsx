import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { CiSearch } from "react-icons/ci";
import { FadeLoader } from "react-spinners";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import api from "../axiosConfig";
import UserCard from "../components/UserCard";
import UpdateBox from "../components/UpdateBox";
import { LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion";

const User = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/users?page=${page}&delay=1`);
      if (response?.data?.data) {
        setData(response.data.data);
        setTotalPage(response.data.total_pages);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [page]);

  useEffect(() => {
    if (search.trim() === "") {
      const finalData = data.map((item) => ({
        ...item,
        fullName: `${item.first_name} ${item.last_name}`,
      }));
      setFilteredData(finalData);
    } else {
      const result = data
        ?.map((item) => ({
          ...item,
          fullName: `${item.first_name} ${item.last_name}`,
        }))
        .filter((user) =>
          user.fullName.toLowerCase().includes(search.toLowerCase())
        );
      setFilteredData(result);
    }
  }, [search, data]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setSearchParams({ page: page - 1 });
    }
  };

  const handleNext = () => {
    setPage(page + 1);
    setSearchParams({ page: page + 1 });
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <motion.h1
            className="text-2xl font-bold text-center md:text-left"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            EmployWise
          </motion.h1>
          <motion.button
            className="flex gap-2 items-center justify-center md:justify-start md:order-1 cursor-pointer"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            <span className="hidden md:block">Logout</span>
            <LuLogOut color="red" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full md:w-1/3"
          >
            <input
              type="text"
              id="search"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <CiSearch size={22} />
            </span>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <FadeLoader />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <UserCard
                    user={user}
                    key={user.id}
                    setData={setData}
                    setShowUpdateBox={setShowUpdateBox}
                    setSelectedUser={setSelectedUser}
                  />
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-600">
                  No users found.
                </p>
              )}
            </div>

            {/* Pagination */}
            <div className="container flex justify-center items-center gap-4 mt-10">
              {page > 1 && (
                <motion.button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className="p-1 bg-blue-500 text-white rounded-full cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GrFormPreviousLink size={22} />
                </motion.button>
              )}

              <motion.span
                className="px-4 py-2 bg-white shadow rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                 {page}
              </motion.span>

              {totalPage > page && (
                <motion.button
                  onClick={handleNext}
                  className="p-1 bg-blue-500 text-white rounded-full cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <GrFormNextLink size={22} />
                </motion.button>
              )}
            </div>
          </>
        )}
      </div>

      {showUpdateBox && (
        <UpdateBox
          user={selectedUser}
          setData={setData}
          setShowUpdateBox={setShowUpdateBox}
        />
      )}
    </>
  );
};

export default User;
