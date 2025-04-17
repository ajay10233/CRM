import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const comment = await prisma.abusiveComment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json({ message: "Abusive comment not found" }, { status: 404 });
    }

    if (status === "ACCEPTED") {
      // Delete the abusive comment first to avoid relational constraint
      await prisma.abusiveComment.delete({ where: { id } });

      const reviewId = comment.reviewId;
      if (reviewId) {
        await prisma.review.delete({ where: { id: reviewId } });
      }
    } else {
      // Just delete the abusive report if not accepted
      await prisma.abusiveComment.delete({ where: { id } });
    }

    const message = status === "ACCEPTED"
      ? "Comment removal accepted"
      : "Comment removal rejected";

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
