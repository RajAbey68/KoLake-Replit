import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { koLakeLife } from '@/shared/schema';
import { eq, desc, and, gte } from 'drizzle-orm';

// Public API for fetching Ko Lake Life items on the website
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '10');
    const featured = searchParams.get('featured');
    
    const conditions = [eq(koLakeLife.isActive, true)];
    
    if (type) {
      conditions.push(eq(koLakeLife.type, type));
    }
    
    if (featured === 'true') {
      conditions.push(eq(koLakeLife.isFeatured, true));
    }
    
    // For events and offers, only show future/current items
    if (type === 'event' || type === 'offer') {
      conditions.push(gte(koLakeLife.endDate, new Date()));
    }
    
    const items = await db.select().from(koLakeLife)
      .where(and(...conditions))
      .orderBy(desc(koLakeLife.displayOrder), desc(koLakeLife.createdAt))
      .limit(limit);
    
    return NextResponse.json({
      success: true,
      data: items
    });
    
  } catch (error) {
    console.error('Error fetching Ko Lake Life items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}