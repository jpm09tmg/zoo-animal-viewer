import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const animal = await prisma.animal.findUnique({
      where: { 
        id,
        isActive: true 
      }
    });

    if (!animal) {
      return NextResponse.json(
        { success: false, error: 'Animal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      animal
    });

  } catch (error) {
    console.error('Get animal error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch animal' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, category, habitat, imageUrl, userRole } = body;

    if (userRole !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    if (!name || !category) {
      return NextResponse.json(
        { success: false, error: 'Name and category are required' },
        { status: 400 }
      );
    }

    const animal = await prisma.animal.update({
      where: { id },
      data: {
        name,
        category,
        habitat: habitat || null,
        imageUrl: imageUrl || null
      }
    });

    return NextResponse.json({
      success: true,
      animal
    });

  } catch (error) {
    console.error('Update animal error:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Animal not found' },
        { status: 404 }
      );
    }
n
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'An animal with this name already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update animal' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { userRole } = body;

    if (userRole !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const animal = await prisma.animal.update({
      where: { id },
      data: { isActive: false }
    });

    return NextResponse.json({
      success: true,
      message: 'Animal deleted successfully'
    });

  } catch (error) {
    console.error('Delete animal error:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { success: false, error: 'Animal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete animal' },
      { status: 500 }
    );
  }
}