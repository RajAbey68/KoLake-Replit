import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { galleryImages } from '@/shared/schema';
import { eq } from 'drizzle-orm';

// GET /api/admin/gallery/hero - Fetch all hero-approved images
export async function GET() {
  try {
    const heroImages = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.isHero, true))
      .orderBy(galleryImages.displayOrder, galleryImages.createdAt);

    return NextResponse.json({
      success: true,
      images: heroImages
    });
  } catch (error) {
    console.error('Failed to fetch hero images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero images' },
      { status: 500 }
    );
  }
}