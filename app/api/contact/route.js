import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// GET method to fetch contacts (for admin dashboard)
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'contacts.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: true, contacts: [] });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const contacts = JSON.parse(fileContent);
    
    // Sort by timestamp, newest first
    contacts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ success: false, contacts: [] }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const contactEntry = {
      id: Date.now(),
      name,
      email, 
      message,
      timestamp: new Date().toISOString(),
      status: 'unread'
    };

    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'contacts.json');
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let contacts = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      contacts = JSON.parse(fileContent);
    }

    contacts.push(contactEntry);
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));

    return NextResponse.json({ message: 'Contact form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}