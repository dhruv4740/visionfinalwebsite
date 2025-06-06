import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to check if data directory exists and create it if needed
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
};

// Helper function to get events file path
const getEventsFilePath = () => {
  const dataDir = ensureDataDir();
  return path.join(dataDir, 'events.json');
};

// Helper function to read events from file
const readEventsFile = () => {
  const filePath = getEventsFilePath();
  
  if (!fs.existsSync(filePath)) {
    // Create empty events file if it doesn't exist
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
};

// Helper function to write events to file
const writeEventsFile = (events) => {
  const filePath = getEventsFilePath();
  fs.writeFileSync(filePath, JSON.stringify(events, null, 2));
};

// GET - Fetch all events
export async function GET() {
  try {
    const events = readEventsFile();
    
    // Sort by date, upcoming first
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST - Create new event
export async function POST(request) {
  try {
    const eventData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'date', 'time', 'location', 'description'];
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` }, 
          { status: 400 }
        );
      }
    }
    
    // Create new event object
    const newEvent = {
      id: Date.now().toString(),
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      description: eventData.description,
      image: eventData.image || null,
      registrationLink: eventData.registrationLink || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add to events list
    const events = readEventsFile();
    events.push(newEvent);
    writeEventsFile(events);
    
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

// PATCH - Update an existing event
export async function PATCH(request) {
  try {
    const { id, ...updates } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }
    
    // Find and update event
    const events = readEventsFile();
    const eventIndex = events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    // Update the event
    const updatedEvent = {
      ...events[eventIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    events[eventIndex] = updatedEvent;
    writeEventsFile(events);
    
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

// DELETE - Remove an event
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }
    
    // Find and remove event
    const events = readEventsFile();
    const updatedEvents = events.filter(event => event.id !== id);
    
    if (updatedEvents.length === events.length) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    writeEventsFile(updatedEvents);
    
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}