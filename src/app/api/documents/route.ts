import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isSupabaseConfigured } from '@/lib/local-storage';

export async function GET(request: NextRequest) {
  const filePath = request.nextUrl.searchParams.get('path');
  if (!filePath) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    // Redirect to Supabase signed URL
    const { createServiceClient } = await import('@/lib/supabase');
    const supabase = createServiceClient();
    const { data } = await supabase.storage.from('documents').createSignedUrl(filePath, 3600);
    if (data?.signedUrl) {
      return NextResponse.redirect(data.signedUrl);
    }
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  } else {
    // Serve from local .data directory
    const localPath = path.join(process.cwd(), '.data', filePath);

    if (!fs.existsSync(localPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(localPath);
    const ext = path.extname(localPath).toLowerCase();

    const mimeTypes: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.csv': 'text/csv',
      '.txt': 'text/plain',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Sanitize filename for Content-Disposition (ASCII only)
    const safeName = path.basename(localPath).replace(/[^\x20-\x7E]/g, '_');

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${safeName}"`,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  }
}
