"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type UserType = "USER" | "INSTITUTION" | "SHOP_OWNER";

interface User {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  role: UserType;
}

const badgeStyles = {
  USER: "bg-purple-100 text-purple-700",
  INSTITUTION: "bg-green-100 text-green-700",
  SHOP_OWNER: "bg-yellow-100 text-yellow-700",
};

export default function UserList() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"" | UserType>("");

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

  const handleFilterChange = (role: "" | UserType) => {
    setFilterLoading(true);
    setSelectedRole(role);
    setTimeout(() => {
      setFilterLoading(false);
    }, 300); // Optional filter transition delay
  };

  const filteredUsers =
    selectedRole === "" ? users : users.filter((user) => user.role === selectedRole);

  return (
    <div className="p-6 max-w-4xl mx-auto h-screen">
      <h2 className="text-2xl font-bold text-white mb-4">User List (CRM)</h2>

      {/* Filter Dropdown */}
      <div className="mb-4 flex items-center space-x-3">
        <label htmlFor="role-filter" className="text-white text-sm font-medium">
          Filter by Role:
        </label>
        <select
          id="role-filter"
          value={selectedRole}
          onChange={(e) => handleFilterChange(e.target.value as UserType | "")}
          className="bg-[#2F3E4C] border border-[#394652] text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">All</option>
          <option value="USER">User</option>
          <option value="INSTITUTION">Institution</option>
          <option value="SHOP_OWNER">Shop Owner</option>
        </select>
      </div>

      {loading || filterLoading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-6 h-6 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <p className="text-white">No users found for this role.</p>
      ) : (
        <motion.div
          className="h-[75vh] overflow-y-auto pr-2 space-y-3 scroll-smooth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                onClick={() => handleClick(user.id)}
                className="cursor-pointer flex items-center justify-between bg-[#2F3E4C] p-4 rounded-xl border border-[#394652] transition-all duration-300 ease-in-out hover:border-cyan-500 hover:bg-gradient-to-r hover:from-[#2f3e4c] hover:to-[#3a4f5f] hover:shadow-lg"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {user.firstName} {user.lastName ?? ""}
                  </h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    badgeStyles[user.role] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role
                    .replace("_", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
