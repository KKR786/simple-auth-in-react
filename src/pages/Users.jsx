import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useAuthContext } from "../customHooks/useAuthContext";

function Users() {
  const { user } = useAuthContext();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://reqres.in/api/users", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await res.json();
      if (res.ok) {
        setUsers([
          ...users,
          ...json.data.slice(0, 10).map((user) => ({
            name: user.first_name + " " + user.last_name,
            email: user.email,
          })),
        ]);
      }
    };
    if (user) {
      fetchUsers();
    }
  }, [user, users]);
  
  
  return (
    <div className="p-[50px]">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-semibold text-[26px]">Users</h1>
        <div className="flex gap-x-[10px]">
          <Link className="px-4 py-2 rounded-[10px] hover:bg-indigo-500 bg-white hover:text-white flex items-center shadow-[0_1px_3px_1px_rgba(0,0,0,0.3)]">
            <span className="material-symbols-rounded mr-2">backup</span>Import
          </Link>
          <Link to='/signup' className="px-4 py-2 rounded-[10px] text-white hover:bg-indigo-500 bg-[slateblue] flex items-center">
            <span className="material-symbols-rounded mr-2">add</span>Add User
          </Link>
        </div>
      </div>
      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-700 text-white">
            <tr className="text-left">
                <th className="py-4 px-6 capitalize font-medium">User Info</th>
                <th className="py-4 px-6 capitalize font-medium">About</th>
                <th className="py-4 px-6 capitalize font-medium">Status</th>
            </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
            {users ? (
                users.slice(0, 10).map((user, i) => (
                    <tr key={i} className="border-b-2">
                        <td className="py-4 px-6">
                            <h3 className="font-semibold">{user.name}</h3>
                            <span>{user.email}</span>
                        </td>
                        <td className="py-4 px-6">
                            Some dummy Content
                        </td>
                        <td className="py-4 px-6 mt-[8px] flex justify-between items-center">
                            Random Sticker Label
                            <div className="flex items-center">
                                <span className="material-symbols-rounded mr-4 cursor-pointer">delete</span>
                                <span className="material-symbols-rounded cursor-pointer">edit</span>
                            </div>
                        </td>
                    </tr>
                ))
                ) : (
                    <tr className="text-center py-8 px-6">No data available.</tr>
                )
            }
        </tbody>
      </table>
    </div>
  );
}

export default Users;
