"use client";
import React, { useEffect, useState } from "react";
import { use } from "react"; // <- import `use` from React

interface Params {
  params: Promise<{ id: string }>;
}

interface User {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  username: string;
  phone: string;
  role: string;
  age?: string;
  gender?: string;
  houseNumber?: string;
  street?: string;
  buildingName?: string;
  landmark?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  mobileNumber?: string;
  profilePhoto?: string;
  firmName?: string;
  shopAddress?: string;
  contactEmail?: string;
  paymentDetails?: string;
  description?: string;
  hashtags?: string;
  photos?: string[];
  shopOpenTime?: string;
  shopCloseTime?: string;
  shopOpenDays?: string[];
  latitude?: number;
  longitude?: number;
}

export default function UserDetailPage({ params }: Params) {
  const { id } = use(params); // <- unwrap the promise here safely
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);
        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const display = (value: any) => {
    if (Array.isArray(value))
      return value.length ? value.join(", ") : "Not uploaded by the user";
    return value ?? "Not uploaded by the user";
  };

  if (loading)
    return <div className="p-6 text-white">Loading user details...</div>;
  if (!user) return <div className="p-6 text-red-400">User not found</div>;

  return (
    <div className="min-h-screen bg-[#222629] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">User Details</h1>
      <div className="bg-[#2F3E4C] rounded-xl p-6 space-y-4">
        <img
          src={user.profilePhoto || "https://media.istockphoto.com/id/619400810/photo/mr-who.webp?a=1&b=1&s=612x612&w=0&k=20&c=6cz9uumveIOesURahritB_WaN5aIkKy1lAOp_1VfBX8="}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border border-gray-500"
        />
        <p>
          <strong>Username:</strong> {display(user.username)}
        </p>
        <p>
          <strong>Firm Name:</strong> {display(user.firmName)}
        </p>
        <p>
          <strong>Shop Address:</strong> {display(user.shopAddress)}
        </p>
        <p>
          <strong>Contact Email:</strong> {display(user.email)}
        </p>
        <p>
          <strong>Payment Details:</strong> {display(user.paymentDetails)}
        </p>
        <p>
          <strong>Description:</strong> {display(user.description)}
        </p>
        <p>
          <strong>Hashtags:</strong> {display(user.hashtags)}
        </p>
        <p>
          <strong>Photos:</strong> {display(user.photos)}
        </p>
        <p>
          <strong>Shop Open Time:</strong> {display(user.shopOpenTime)}
        </p>
        <p>
          <strong>Shop Close Time:</strong> {display(user.shopCloseTime)}
        </p>
        <p>
          <strong>Shop Open Days:</strong> {display(user.shopOpenDays)}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {display(
            [
              user.houseNumber,
              user.buildingName,
              user.street,
              user.landmark,
              user.city,
              user.state,
              user.country,
              user.zipCode,
            ]
              .filter(Boolean)
              .join(", ")
          )}
        </p>
        <p>
          <strong>Mobile Number:</strong> {display(user.phone)}
        </p>
        <p>
          <strong>Latitude:</strong> {display(user.latitude)}
        </p>
        <p>
          <strong>Longitude:</strong> {display(user.longitude)}
        </p>
      </div>
    </div>
  );
}
