import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase-config";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const authContext = createContext({
  modalState: false,
  modalStateHandler: (bolian) => {},
  sendingDataHandler: (data) => {},
  loadingState: false,
  setLoadingState: () => {},
});

export const AuthContextProvider = (props) => {
  const [dataTracking, setDataTracking] = useState(false);
  const [courcesState, setSourcesState] = useState(false);
  //! Data coming from DataBase
  const db = getFirestore(app);

  //! all Data Array
  const [studentsData, setstudentsData] = useState([]);
  const [courcesData, setcourcesData] = useState([]);
  //! Editing Mode logic starts here
  const [editingMode, setEditingMode] = useState(false);
  const [idAndIndex, setIdAndIndex] = useState({ id: "", index: "" });

  const editingModeHandler = (id, index, bolian) => {
    setIdAndIndex({ id: id, index: index });
    setModalState(true);
    setSourcesState(bolian);
    setEditingMode(true);
  };
  //! deleting the element in the array
  const deleteListHandler = async (Id) => {
    try {
      await deleteDoc(doc(db, !courcesState ? "students" : "courses", Id));
      setDataTracking((prevState) => !prevState);
      return toast.success(
        `${!courcesState ? "Student" : "Course"} Removed Successfully`
      );
    } catch (error) {
      return toast.error(err.message);
    }
  };

  // !Loading State for adding User
  const [loadingState, setLoadingState] = useState(false);

  //! modal state
  const [modalState, setModalState] = useState(false);
  const modalStateHandler = (bolian, cources) => {
    setModalState(bolian);
    setSourcesState(cources);
    setEditingMode(false);
  };

  //! sending Data to fireStore
  const sendingDataHandler = async (Data) => {
    const data = Data;

    if (!courcesState) {
      try {
        await setDoc(doc(db, "students", Data.id), data);
        setDataTracking((prevState) => !prevState);
        return toast.success(`User Added Successfully`);
      } catch (error) {
        return toast.error(`Something Went Wrong ❌!!`);
      }
    } else {
      try {
        await setDoc(doc(db, "courses", Data.id), data);
        setDataTracking((prevState) => !prevState);
        return toast.success(`Course Added Successfully`);
      } catch (error) {
        return toast.error(`Something Went Wrong ❌!!`);
      }
    }
  };

  //! updating Array of Students Data
  useEffect(() => {
    const dataFetching = async () => {
      try {
        const Data = await getDocs(collection(db, "students"));
        const array = [];
        Data.forEach((doc) => {
          array.push(doc.data());
        });
        setstudentsData(array);
      } catch (error) {
        return toast.error(`Data fetching gone wrong !!`);
      }
    };
    dataFetching();
  }, [dataTracking]);

  //! updating Array of Students Cources Data
  useEffect(() => {
    const dataFetching = async () => {
      try {
        const Data = await getDocs(collection(db, "courses"));
        const array = [];
        Data.forEach((doc) => {
          array.push(doc.data());
        });
        setcourcesData(array);
      } catch (error) {
        return toast.error(`Data fetching gone wrong !!`);
      }
    };

    dataFetching();
  }, [dataTracking]);

  return (
    <authContext.Provider
      value={{
        modalState,
        modalStateHandler,
        sendingDataHandler,
        document,
        setLoadingState,
        loadingState,
        deleteListHandler,
        //!editing data
        editingMode,
        setEditingMode,
        editingModeHandler,
        studentsData,
        idAndIndex,
        setDataTracking,
        db,
        courcesData,
        courcesState,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default authContext;
