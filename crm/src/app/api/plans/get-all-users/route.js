import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const usersWithPlans = await prisma.user.findMany({
      where: {
        subscriptionPlanId: {
          not: null,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        planActivatedAt: true,
        planExpiresAt: true,
        subscriptionPlan: {
          select: {
            id: true,
            name: true,
            price: true,
            features: true,
            durationInDays: true,
            description: true,
          },
        },
      },
    });

    return NextResponse.json(usersWithPlans,{ status: 200 });
  } catch (error) {
    console.error('Error fetching users with plans:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
