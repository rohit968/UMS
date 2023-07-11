import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserId,
  getUserName,
  getUserEmail,
  getUserPhone,
} from "../../Redux/Redux/Actions/userAction";
import { useSelector } from "react-redux";

const AddUser = () => {
  const { userid, name, email, phone } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({
    userid: "",
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      userid: !userid.trim() ? "Title is required" : "",
      name: !name.trim() ? "Description is required" : "",
      email: !emailRegex.test(email) ? "Invalid Email Address" : "",
      phone:
        phone.length < 10 || phone.length > 10
          ? "Enter valid phone number"
          : "",
      main: "",
      adding: "",
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios
        .post("/adduser", {
          userid,
          name,
          email,
          phone,
        })
        .then((res) => {
          setErrors({ ...errors, adding: "true" });
          setTimeout(() => {
            navigate("/");
          }, 4000);
          getUserId("");
          getUserName("");
          getUserEmail("");
          getUserPhone("");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = () => {
    setErrors({ ...errors, main: "" });
  };

  return (
    <div className="h-screen bg-cyan-500 flex flex-col justify-center items-center ">
      <h1 className="text-white text-3xl">Add User</h1>
      <form
        className="p-5 w-5/6 md:w-1/4 bg-white rounded-md mt-10"
        onSubmit={handleFormSubmit}
      >
        {errors.main && (
          <p
            className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5  py-1 rounded-md text-sm"
            onClick={handleError}
          >
            {errors.main}
          </p>
        )}
        {errors.adding && (
          <p className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5  py-1 rounded-md text-sm">
            Adding the user ...
          </p>
        )}

        <div className="my-3">
          <label htmlFor="id" className="block text-sm">
            User Id
          </label>
          <input
            type="text"
            id="id"
            value={userid}
            className="w-full  bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              getUserId(e.target.value);
              setErrors({ ...errors, id: "", main: "" });
            }}
          />
          {errors.id && <p className="text-red-500 mb-3">{errors.id}</p>}
        </div>

        <div className="my-3">
          <label htmlFor="name" className="block text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className="w-full  bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              getUserName(e.target.value);
              setErrors({ ...errors, name: "", main: "" });
            }}
          />
          {errors.name && <p className="text-red-500 mb-3">{errors.name}</p>}
        </div>

        <div className="my-3">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="w-full  bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              getUserEmail(e.target.value);
              setErrors({ ...errors, email: "", main: "" });
            }}
          />
          {errors.email && <p className="text-red-500 mb-3">{errors.email}</p>}
        </div>

        <div className="my-5">
          <label htmlFor="phone" className="block text-sm">
            Contact Number
          </label>
          <input
            type="number"
            id="phone"
            value={phone}
            className="w-full  bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              getUserPhone(e.target.value);
              setErrors({ ...errors, phone: "", main: "" });
            }}
          />
          {errors.phone && <p className="text-red-500 mb-3">{errors.phone}</p>}
        </div>

        <button
          type="submit"
          className="my-5 py-2 bg-red-500 rounded-sm w-full text-white"
        >
          Add the user
        </button>
        <Link to="/" className="text-black flex justify-center">
          Back to home
        </Link>
      </form>
    </div>
  );
};

export default AddUser;
