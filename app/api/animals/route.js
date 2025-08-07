import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    let where = { isActive: true };
    
    if (category) {
      where.category = category;
    }

    let animals = await prisma.animal.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    if (search) {
      const searchLower = search.toLowerCase();
      animals = animals.filter(animal => 
        animal.name.toLowerCase().includes(searchLower) ||
        animal.category.toLowerCase().includes(searchLower) ||
        (animal.habitat && animal.habitat.toLowerCase().includes(searchLower))
      );
    }

    return NextResponse.json({
      success: true,
      animals
    });

  } catch (error) {
    console.error('Get animals error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch animals' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
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

    const animal = await prisma.animal.create({
      data: {
        name,
        category,
        habitat: habitat || null,
        imageUrl: imageUrl || null,
        isActive: true
      }
    });

    return NextResponse.json({
      success: true,
      animal
    });

  } catch (error) {
    console.error('Create animal error:', error);
 
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'An animal with this name already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create animal' },
      { status: 500 }
    );
  }
}