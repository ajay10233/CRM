"use client";
import React from "react";
import { useRouter } from "next/navigation";

type UserType = "customer" | "medical-institute" | "seller";

interface User {
  id: number;
  name: string;
  email: string;
  type: UserType;
}

const users: User[] = [
  { id: 1, name: "Alice Sharma", email: "alice@example.com", type: "customer" },
  { id: 2, name: "HealthCare Pro", email: "info@hcp.com", type: "medical-institute" },
  { id: 3, name: "PharmaSell Pvt Ltd", email: "sales@pharmasell.com", type: "seller" },
  { id: 4, name: "Rahul Mehta", email: "rahul@example.com", type: "customer" },
];

const badgeStyles = {
  customer: "bg-blue-100 text-blue-700",
  "medical-institute": "bg-green-100 text-green-700",
  seller: "bg-yellow-100 text-yellow-700",
};

export default function UserList() {
  const router = useRouter();

  const handleClick = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">User List (CRM)</h2>
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleClick(user.id)}
            className="cursor-pointer flex items-center justify-between bg-[#2F3E4C] p-4 rounded-xl shadow-md border border-[#394652] hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{user.name}</h3>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[user.type]}`}
            >
              {user.type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
