
"use client"
import React, { useEffect, useState } from "react";

interface Params {
  params: { id: string };
}

interface User {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  profilePhoto?: string;
  age?: string;
  gender?: string;
  address?: string;
  // add any other fields you want to display
}

export default function UserDetailPage({ params }: Params) {
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        setUser(data.data); // adjust if your API wraps user inside `data`
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="p-6 text-white">Loading user details...</div>;
  if (!user) return <div className="p-6 text-red-400">User not found</div>;

  return (
    <div className="min-h-screen bg-[#222629] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">User Details</h1>
      <div className="bg-[#2F3E4C] rounded-xl p-6 space-y-4">
        <img
          src={user.profilePhoto || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border border-gray-500"
        />
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.firstName} {user.lastName ?? ""}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Age:</strong> {user.age ?? "N/A"}</p>
        <p><strong>Gender:</strong> {user.gender ?? "N/A"}</p>
        <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
