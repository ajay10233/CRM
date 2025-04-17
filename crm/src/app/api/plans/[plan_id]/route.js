import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import cloudinary from "@/utils/cloudinary";

export async function GET(req, { params }) {
    const { plan_id } = await params;
    const plan = await prisma.plan.findUnique({
        where: { id: plan_id },
    });

    if (!plan) return NextResponse.json({ error: "Plan not found" }, { status: 404 });

    return NextResponse.json(plan, { status: 200 });
}


export async function PUT(req, { params }) {
    const { plan_id } = await params;
    try {
        const data = await req.json();
        const { name, price, description, features, durationInDays, image } = data;

        const updateData = {};  

        if (name) {
            if (typeof name !== "string") {
                return NextResponse.json({ error: "Name must be a string." }, { status: 400 });
            }
            updateData.name = name;
        }

        if (price !== undefined) { 
            if (typeof price !== "number" || price < 0) {
                return NextResponse.json({ error: "Price must be a valid non-negative number." }, { status: 400 });
            }
            updateData.price = price; 
        }

        if (description) {
            if (typeof description !== "string") {
                return NextResponse.json({ error: "Description must be a string." }, { status: 400 });
            }
            updateData.description = description;
        }

        if (features) {
            if (!Array.isArray(features) || !features.every(f => typeof f === "string")) {
                return NextResponse.json({ error: "Features must be an array of strings." }, { status: 400 });
            }
            updateData.features = features;
        }

        if (durationInDays !== undefined) { 
            if (
                durationInDays !== null &&
                (typeof durationInDays !== "number" || durationInDays < 1)
            ) {
                return NextResponse.json({
                    error: "durationInDays must be a positive number or null.",
                }, { status: 400 });
            }
            updateData.durationInDays = durationInDays ?? null;
        }

        if (image) {
            const uploadRes = await cloudinary.uploader.upload(image, { folder: "plans" });
            updateData.image = uploadRes.secure_url;
            console.log("Image URL:", updateData.image);
        }

        const updatedPlan = await prisma.plan.update({
            where: { id: plan_id },
            data: updateData,
        });

        return NextResponse.json(updatedPlan, { status: 200 });
    } catch (error) {
        console.error("Plan update error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
