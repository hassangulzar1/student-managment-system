import React, { useContext } from "react";
import authContext from "../../Context/auth-context";
import DashboardBoxes from "../../components/DasboardBoxes";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { Done } from "@mui/icons-material";

const Dashboard = () => {
  const ctx = useContext(authContext);

  return (
    <div className="d-flex justify-content-center">
      <DashboardBoxes
        className="studentBox"
        titleColor="black"
        title="Students"
        count={ctx.studentsData.length}
        SchoolOutlinedIcon={Done}
      />
      <DashboardBoxes
        className="coursesBox"
        titleColor="black"
        title="Courses"
        count={ctx.courcesData.length}
      />
      <DashboardBoxes />
    </div>
  );
};

export default Dashboard;
