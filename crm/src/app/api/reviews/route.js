import { NextResponse } from 'next/server';
import { prisma } from "@/lib/db";


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const institutionId = searchParams.get("institutionId");

    if (!institutionId) {
        return NextResponse.json({ error: "Missing institutionId" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
        where: { institutionId },
        include: {
            user: {
                select: { firstName: true, lastName: true, profilePhoto: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
}