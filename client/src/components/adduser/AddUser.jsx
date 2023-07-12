import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineUpload } from "react-icons/hi";
import {
  getUserId,
  getUserName,
  getUserProfilePicture,
  getUserEmail,
  getUserPhone,
} from "../../Redux/Redux/Actions/userAction";

const AddUser = () => {
  const { userid, name, email, profilePicture, phone } = useSelector(
    (state) => state.user
  );

  const [errors, setErrors] = useState({
    userid: "",
    name: "",
    email: "",
    phone: "",
  });

  const [imageData, setImageData] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {
      userid: !userid.trim() ? "User ID is required" : "",
      name: !name.trim() ? "Name is required" : "",
      email: !emailRegex.test(email) ? "Invalid Email Address" : "",
      phone: phone.length !== 10 ? "Enter a valid 10-digit phone number" : "",
      main: "",
      adding: "",
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    // If all validations pass, submit the form
    const formData = new FormData();
    formData.append("userid", userid);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("filename", profilePicture);
    formData.append("phone", phone);

    try {
      await axios.post("/adduser", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setErrors({ ...errors, adding: "true" });

      setTimeout(() => {
        navigate("/");
      }, 4000);

      getUserId("");
      getUserName("");
      getUserProfilePicture("");
      getUserEmail("");
      getUserPhone("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleError = () => {
    setErrors({ ...errors, main: "" });
  };

  const handlePhoto = (e) => {
    if (e.target.files[0]) {
      getUserProfilePicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  console.log(profilePicture);

  return (
    <div className="h-screen bg-cyan-500 flex flex-col justify-center items-center">
      <h1 className="text-white text-3xl">Add User</h1>
      <form
        className="p-5 w-5/6 md:w-1/4 bg-white rounded-md mt-10"
        onSubmit={handleFormSubmit}
      >
        {errors.main && (
          <p
            className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5 py-1 rounded-md text-sm"
            onClick={handleError}
          >
            {errors.main}
          </p>
        )}
        {errors.adding && (
          <p className="bg-red-900 text-white mx-auto mt-2 w-fit px-1.5 py-1 rounded-md text-sm">
            Adding the user ...
          </p>
        )}

        <div className="my-3">
          <label htmlFor="id" className="block text-sm">
            User ID
          </label>
          <input
            type="text"
            id="id"
            value={userid}
            className="w-full bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              getUserId(e.target.value);
              setErrors({ ...errors, userid: "", main: "" });
            }}
          />
          {errors.userid && (
            <p className="text-red-500 mb-3">{errors.userid}</p>
          )}
        </div>

        <div className="my-3">
          <label htmlFor="name" className="block text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className="w-full bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
            onChange={(e) => {
              getUserName(e.target.value);
              setErrors({ ...errors, name: "", main: "" });
            }}
          />
          {errors.name && <p className="text-red-500 mb-3">{errors.name}</p>}
        </div>

        <div className={profilePicture ? "my-5 flex gap-2" : "my-5"}>
          {profilePicture && (
            <div className="h-16 w-28">
              <img
                src={imageData}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <label
            htmlFor="photo"
            className="flex items-center gap-1 shadow-lg px-3 py-1 cursor-pointer text-sm"
          >
            <HiOutlineUpload />
            Upload a profile picture
          </label>
          <input
            type="file"
            id="photo"
            className="hidden"
            onChange={handlePhoto}
          />
        </div>

        <div className="my-3">
          <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="w-full bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
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
            className="w-full bg-slate-500 rounded-sm py-1 px-2 text-white focus:outline-none"
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
