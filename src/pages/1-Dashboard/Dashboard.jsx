import React, { useContext } from "react";
import authContext from "../../Context/auth-context";

const Dashboard = () => {
  const ctx = useContext(authContext);
  console.log(ctx.studentsData.length);
  return (
    <div style={{ margin: "auto" }}>
      <h1>Total Students: {ctx.studentsData.length}</h1>
      <h1>Cources: {ctx.courcesData.length}</h1>
    </div>
  );
};

export default Dashboard;
