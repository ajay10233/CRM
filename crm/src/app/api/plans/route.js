import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import cloudinary from "@/utils/cloudinary";

export async function GET() {
  const plans = await prisma.plan.findMany();
  return NextResponse.json(plans,{ status: 200 });
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, price, description, features, durationInDays, image } = data;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (typeof price !== "number" || price < 0) {
      return NextResponse.json({ error: "Price must be a valid non-negative number." }, { status: 400 });
    }

    if (
      durationInDays !== null &&
      durationInDays !== undefined &&
      (typeof durationInDays !== "number" || durationInDays < 1)
    ) {
      return NextResponse.json(
        { error: "durationInDays must be a positive number or null." },
        { status: 400 }
      );
    }

    let imageUrl = null;

    if (image && typeof image === "string") {
      const uploadRes = await cloudinary.uploader.upload(image, { folder: "plans" });
      imageUrl = uploadRes.secure_url;
    }

    const plan = await prisma.plan.create({
      data: {
        name,
        price,
        description,
        features,
        durationInDays: durationInDays ?? null,
        image: imageUrl,
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("Plan creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}