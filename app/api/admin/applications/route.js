import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const applicationsPath = path.join(process.cwd(), 'data', 'applications.json');
    
    if (!fs.existsSync(applicationsPath)) {
      return NextResponse.json({ applications: [] });
    }
    
    const fileContent = fs.readFileSync(applicationsPath, 'utf8');
    const applications = JSON.parse(fileContent);
    
    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}