import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewPage = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/user/${id}`).then((res) => {
      setUser(res.data);
    });
  }, [id]);

  return (
    <div className="h-screen bg-cyan-500 text-white flex flex-col gap-10 justify-center items-center">
      <h1 className="text-3xl">Details of {user.name}</h1>
      <table className="border border-black text-sm md:text-base">
        <thead className="border-b border-black">
          <tr>
            <th className="border-r border-black p-1 md:p-4">User ID</th>
            <th className="border-r border-black p-1 md:p-4">Name</th>
            <th className="border-r border-black p-1 md:p-4">Email</th>
            <th className="p-1 md:p-4">Contact Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r border-black p-1 md:p-4">{user.userid}</td>
            <td className="border-r border-black p-1 md:p-4">{user.name}</td>
            <td className="border-r border-black p-1 md:p-4">{user.email}</td>
            <td className="p-1 md:p-4">{user.phone}</td>
          </tr>
        </tbody>
      </table>
      <Link to="/" className="text-black flex justify-center">
        Back to home
      </Link>
    </div>
  );
};

export default ViewPage;
