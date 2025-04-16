import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(req, { params }) {
    const { name, discountPercentage, startDate, durationInDays } = await req.json();
    const { id } = params;
  
    const updatedCoupon = await prisma.coupon.update({
      where: { id },
      data: {
        name,
        discountPercentage,
        startDate: new Date(startDate),
        durationInDays,
      },
    });
  
    return NextResponse.json(updatedCoupon);
  }

  export async function DELETE(req, { params }) {
    const { id } = params;
  
    const deletedCoupon = await prisma.coupon.delete({
      where: { id },
    });
  
    return NextResponse.json(deletedCoupon);
  }