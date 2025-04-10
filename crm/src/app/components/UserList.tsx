"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserType = "customer" | "medical-institute" | "seller" | "USER";

interface User {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  role: UserType;
}

const badgeStyles = {
  customer: "bg-blue-100 text-blue-700",
  "medical-institute": "bg-green-100 text-green-700",
  seller: "bg-yellow-100 text-yellow-700",
  USER: "bg-purple-100 text-purple-700",
};

export default function UserList() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users/all");
        const data = await res.json();
        setUsers(data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleClick = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-screen">
      <h2 className="text-2xl font-bold text-white mb-4">User List (CRM)</h2>

      {loading ? (
        <p className="text-white">Loading users...</p>
      ) : (
        <div className="h-[80vh] overflow-y-auto pr-2 space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleClick(user.id)}
              className="cursor-pointer flex items-center justify-between bg-[#2F3E4C] p-4 rounded-xl shadow-md border border-[#394652] hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {user.firstName} {user.lastName ?? ""}
                </h3>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[user.role] || "bg-gray-100 text-gray-700"}`}
              >
                {user.role.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
