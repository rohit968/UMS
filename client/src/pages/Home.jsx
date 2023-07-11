import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { getAllUsers } from "../Redux/Redux/Actions/userAction";
import { useSelector } from "react-redux";

const Home = () => {
  const [error, setError] = useState("");
  const [updation, setUpdation] = useState(false);
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    const result = async () => {
      try {
        const response = await axios.get("/users");
        getAllUsers(response?.data);
      } catch (error) {
        setError(error.response?.data.error);
      }
    };
    result();
  }, [updation]);

  console.log(error);

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };

  const handleView = (id) => {
    navigate(`/viewuser/${id}`);
  };

  const handleDelete = (id) => {
    try {
      axios.delete(`/delete/${id}`).then(() => {
        navigate("/");
        setUpdation(!updation);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen bg-cyan-500">
      <div className="flex justify-center pt-8 pb-8">
        <Link
          to="/adduser"
          className="bg-red-500 text-white px-2 py-1 rounded-md "
        >
          Add new user
        </Link>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center text-white">
        <h1 className="text-3xl">List of all the users present</h1>
        <div>
          <div>
            {error ? (
              <p>{error}</p>
            ) : (
              <table className="border border-black">
                <thead className="border-b border-black">
                  <tr>
                    <th className="border-r border-black p-4">User ID</th>
                    <th className="border-r border-black p-4">User Name</th>
                    <th className="p-4">More Updation</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user.id} className="border-b border-black">
                      <td className="border-r border-black p-4">
                        {user.userid}
                      </td>
                      <td className="border-r border-black p-4">{user.name}</td>
                      <td className="p-4 flex justify-around">
                        <button
                          className="bg-yellow-800 p-1 rounded-md "
                          onClick={() => handleView(user.userid)}
                        >
                          View
                        </button>
                        <AiOutlineEdit
                          className="bg-green-900 text-white rounded-md h-7  w-7 p-0.5 cursor-pointer"
                          onClick={() => handleEdit(user.userid)}
                        />
                        <AiOutlineDelete
                          className="bg-red-500 text-white rounded-md h-7  w-7 p-0.5 cursor-pointer"
                          onClick={() => handleDelete(user.userid)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
