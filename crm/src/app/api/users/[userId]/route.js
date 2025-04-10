import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (req, { params }) => {
  const { userId } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
};
