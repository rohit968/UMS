import React from "react";
import { useLocation } from "react-router-dom";
import AddUser from "../components/adduser/AddUser";
import EditUser from "../components/edituser/EditUser";

const AddUpdateUser = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return <div>{pathname === "/adduser" ? <AddUser /> : <EditUser />}</div>;
};

export default AddUpdateUser;
