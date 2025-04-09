import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        role: true,
        age: true,
        gender: true,
        houseNumber: true,
        street: true,
        buildingName: true,
        landmark: true,
        city: true,
        state: true,
        country: true,
        zipCode: true,
        mobileNumber: true,
        profilePhoto: true,
        firmName: true,
        shopAddress: true,
        contactEmail: true,
        paymentDetails: true,
        description: true,
        hashtags: true,
        photos: true,
        shopOpenTime: true,
        shopCloseTime: true,
        shopOpenDays: true,
        latitude: true,
        longitude: true,
      },
    });

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Failed to fetch users", error },
      { status: 500 }
    );
  }
};
