import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const id = formData.get('id') as string;

    if (!file || !id) {
      return NextResponse.json({ error: 'File and id are required' }, { status: 400 });
    }

    // For now, return a demo URL since we don't have storage setup
    // In production, this would upload to your storage service
    const url = `/images/uploaded/${id}-${file.name}`;
    
    console.log('Image upload simulated:', { id, filename: file.name, url });
    
    return NextResponse.json({ 
      url,
      success: true,
      message: 'Upload simulated - in production this would save to storage' 
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}