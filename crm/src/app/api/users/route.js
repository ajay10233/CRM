import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const zipCode = searchParams.get("zip_code");

    if (!zipCode) {
        console.log("❌ No zip code provided");
        return NextResponse.json({ data: [] }, { status: 200 });
    }

    try {
        const results = await prisma.user.findMany({
            where: {
                zipCode: zipCode,
            },
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
        })

        return NextResponse.json({ data: results }, { status: 200 });


    } catch (error) {
        console.error("❌ Error searching users:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
