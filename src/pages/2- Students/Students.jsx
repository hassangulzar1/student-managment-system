import React, { useEffect } from "react";
import AddStudent from "./AddStudent";
import Modal from "../../components/Modal";
import StudentTable from "./StudentsTable";
import { db } from "../../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { studentDataActions } from "../../store/studentData-slice";
import { toast } from "react-toastify";

const Students = () => {
  const dispatch = useDispatch();
  // data comming from reducers
  const dataTracking = useSelector((state) => state.studentsData.dataChanging);
  useEffect(() => {
    const dataFetching = async () => {
      let array = [];
      try {
        const data = await getDocs(collection(db, "students"));
        data.forEach((doc) => {
          array.push(doc.data());
        });
        dispatch(studentDataActions.addingData(array));
      } catch (error) {
        return toast.error("data fetching error: " + error.message);
      }
    };
    dataFetching();
  }, [dataTracking]);

  return (
    <div style={{ backgroundColor: "#F8F8F8", height: "90vh" }}>
      <Modal />
      <AddStudent />
      <StudentTable />
    </div>
  );
};

export default Students;

// export async function loader() {
//   const array = [];
//   try {
//     const Data = await getDocs(collection(db, "students"));
//     Data.forEach((doc) => {
//       console.log(doc.data());
//       array.push(doc.data());
//     });
//   } catch (error) {
//     return { isError: true, message: "Could not Fetch Data" };
//   }
//
//   return array;
// }

// export async function action({ request, params }) {
//   const data = await request.formData();
//   let id = Math.random().toString(36).slice(2);
//   const studentData = {
//     id: id,
//     name: data.get("name"),
//     email: data.get("email"),
//     phone: data.get("phone"),
//     date: data.get("date"),
//     gender: data.get("radio"),
//   };
//
//   try {
//     await setDoc(doc(db, "students", id), studentData);
//    closeModal();
//   } catch (error) {
//     console.log(error);
//   }
//   return redirect("/students");
// }
