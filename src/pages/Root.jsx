import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Layout/SideBar";
import Header from "../Layout/Header";

const Root = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />

        <div style={{ width: "100%" }}>
          <Header />
          <main style={{ display: "flex", justifyContent: "end" }}>
            <div style={{ width: "81%" }}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Root;
