"use client";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

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
  const { id } = React.use(params);
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
    return <div className="flex justify-center items-center h-60">
  <div className="w-16 h-16 border-4 border-t-[#4FD1C5] border-b-[#F6AD55] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
</div>;
  if (!user) return <div className="p-6 text-red-400">User not found</div>;

  return (
    <div className="min-h-screen bg-[#222629] text-white p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Details</h1>
        <Link
          href="/dashboard"
          className="bg-[#45A29E] text-white px-4 py-2 rounded-lg hover:bg-[#66FCF1] transition"
        >
          ⬅ Back to Dashboard
        </Link>
      </div>

      <div className="bg-[#2F3E4C] rounded-xl p-6 space-y-4">
        <Image
          src={user.profilePhoto || "https://media.istockphoto.com/id/619400810/photo/mr-who.webp"}
          alt="Profile"
          width={128}
          height={128}
          className="object-cover rounded-full border border-gray-500 mx-auto"
        />

        <p><strong>Username:</strong> {display(user.username)}</p>
        <p><strong>Firm Name:</strong> {display(user.firmName)}</p>
        <p><strong>Shop Address:</strong> {display(user.shopAddress)}</p>
        <p><strong>Contact Email:</strong> {display(user.email)}</p>
        <p><strong>Payment Details:</strong> {display(user.paymentDetails)}</p>
        <p><strong>Description:</strong> {display(user.description)}</p>
        <p><strong>Hashtags:</strong> {display(user.hashtags)}</p>

        <div>
          <strong className="text-lg">Photos:</strong>
          {user.photos && user.photos.length > 0 ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={true}  // Add navigation buttons
              effect="slide"    // Switch to slide effect
              modules={[Navigation, Autoplay]}
              className="mySwiper mt-4"
            >
              {user.photos.map((photoUrl, index) => (
                <SwiperSlide key={index} className="w-[300px] h-[200px]">
                  <Image
                    src={photoUrl}
                    alt={`Photo ${index + 1}`}
                    width={300}
                    height={200}
                    className="object-cover rounded-lg border border-gray-600"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400">Not uploaded by the user</p>
          )}
        </div>

        <p><strong>Shop Open Time:</strong> {display(user.shopOpenTime)}</p>
        <p><strong>Shop Close Time:</strong> {display(user.shopCloseTime)}</p>
        <p><strong>Shop Open Days:</strong> {display(user.shopOpenDays)}</p>
        <p><strong>Address:</strong> {display(
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
        )}</p>
        <p><strong>Mobile Number:</strong> {display(user.phone)}</p>
        <p><strong>Latitude:</strong> {display(user.latitude)}</p>
        <p><strong>Longitude:</strong> {display(user.longitude)}</p>
      </div>
    </div>
  );
}
