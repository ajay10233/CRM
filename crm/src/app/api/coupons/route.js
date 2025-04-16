import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    const coupons = await prisma.coupon.findMany();
    return NextResponse.json(coupons, { status: 200 });
}


export async function POST(req) {
    const { name, discountPercentage, startDate, durationInDays } = await req.json();
    
    if (!name || discountPercentage == null || durationInDays == null) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
  
    const parsedStartDate = startDate
      ? new Date(startDate)
      : new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
  
    const parsedDiscount = parseFloat(discountPercentage);
    const parsedDuration = parseInt(durationInDays);
  
    const expiresAt = new Date(parsedStartDate);
    expiresAt.setDate(expiresAt.getDate() + parsedDuration);
  
    const coupon = await prisma.coupon.create({
      data: {
        name,
        discountPercentage: parsedDiscount,
        startDate: parsedStartDate,
        durationInDays: parsedDuration,
        expiresAt,
      },
    });
  
    return NextResponse.json(coupon,{ status: 200 });
  }