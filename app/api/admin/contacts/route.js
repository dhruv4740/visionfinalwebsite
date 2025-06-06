import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'contacts.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const contacts = JSON.parse(fileContent);
    
    // Sort by timestamp, newest first
    contacts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json([]);
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    
    if (!id || !status || !['read', 'unread'].includes(status)) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }
    
    const filePath = path.join(process.cwd(), 'data', 'contacts.json');
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'No contacts found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const contacts = JSON.parse(fileContent);
    
    const contactIndex = contacts.findIndex(contact => contact.id === id);
    if (contactIndex === -1) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    contacts[contactIndex].status = status;
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
    
    return NextResponse.json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}