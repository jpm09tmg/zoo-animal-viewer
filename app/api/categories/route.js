import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { displayName: 'asc' }
    });

    return NextResponse.json({
      success: true,
      categories
    });

  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, displayName, icon, userRole } = body;

    if (userRole !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    if (!name || !displayName) {
      return NextResponse.json(
        { success: false, error: 'Name and display name are required' },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name: name.toLowerCase(),
        displayName,
        icon: icon || null
      }
    });

    return NextResponse.json({
      success: true,
      category
    });

  } catch (error) {
    console.error('Create category error:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'A category with this name already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}