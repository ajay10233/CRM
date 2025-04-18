import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";


export async function GET(req) {
    const report = await prisma.abusiveComment.findMany();
    return NextResponse.json(report);
}