import React, { useEffect } from "react";
import api from "./axiosConfig";
import Login from "./pages/Login";

const App = () => {
  const fetch = async () => {
    const data = await api.get("/api/users?page=1", {
      headers: {
        abc: "header",
      },
    });
    console.log(data);
  };
  // useEffect(() => {
  //   fetch();
  // }, []);
  return <Login />;
};

export default App;
