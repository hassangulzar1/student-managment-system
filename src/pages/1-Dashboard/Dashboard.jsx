import React, { useContext } from "react";
import authContext from "../../Context/auth-context";
import DashboardBoxes from "../../components/DasboardBoxes";

const Dashboard = () => {
  const ctx = useContext(authContext);
  return (
    <div className="d-flex justify-content-center">
      <DashboardBoxes className="studentBox" />
      <DashboardBoxes />
      <DashboardBoxes />
    </div>

    // <div style={{ margin: "auto" }}>
    //   <h1>Total Students: {ctx.studentsData.length}</h1>
    //   <h1>Cources: {ctx.courcesData.length}</h1>
    // </div>
  );
};

export default Dashboard;
