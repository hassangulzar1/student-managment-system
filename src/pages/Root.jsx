import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Layout/SideBar";
const Root = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />

        <main style={{ width: "100%" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Root;
