import React from "react";

interface Params {
  params: { id: string };
}

export default function UserDetailPage({ params }: Params) {
  const { id } = params;

  // In real app, you'd fetch data using the id
  // Simulated data for now:
  const user = {
    _id: id,
    firstName: "Test",
    lastName: "One",
    email: "test@gmail.com",
    phone: "8764984651",
    password: "$2b$10$...hash...",
    role: "USER",
    createdAt: "2025-03-27T17:17:24.542Z",
    updatedAt: "2025-03-27T17:17:24.542Z",
  };

  return (
    <div className="min-h-screen bg-[#222629] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">User Details</h1>
      <div className="bg-[#2F3E4C] rounded-xl p-6 space-y-4">
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
