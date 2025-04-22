import {  NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import cloudinary from '@/utils/cloudinary';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const images = await prisma.adminImages.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(images,  { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { base64Image, details } = body;

    if (!base64Image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const uploadRes = await cloudinary.uploader.upload(base64Image, {
      folder: 'admin_images',
      public_id: uuidv4(),
    });

    const image = await prisma.adminImages.create({
      data: {
        link: uploadRes.secure_url,
        details,
      },
    });

    return NextResponse.json(image, { status: 200 });
  } catch (error) {
    console.error('❌ Error uploading image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const image = await prisma.adminImages.findUnique({ where: { id } });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    const public_id = image.link.split('/').pop().split('.')[0];
    const publicId = `admin_images/${public_id}`;
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok') {
      console.warn('⚠️ Cloudinary destroy response:', result);
    }else{
        console.log('🧩 Cloudinary destroy response:', result);
    }
    if (image.link) {
      const urlParts = image.link.split('/');
      const versionIndex = urlParts.findIndex((part) => part.startsWith('v')) + 1;
      const publicIdWithExt = urlParts.slice(versionIndex).join('/');
      const publicId = publicIdWithExt.replace(/\.[^/.]+$/, ''); 
      console.log('🧩 Deleting Cloudinary resource with public_id:', publicId);

    }

    await prisma.adminImages.delete({ where: { id } });

    return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('❌ Error deleting image:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}