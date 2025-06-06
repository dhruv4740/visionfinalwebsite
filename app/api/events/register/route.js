import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// POST method to submit event registrations
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { eventId, eventTitle, name, email, phone, year, branch } = body;
    
    if (!eventId || !eventTitle || !name || !email || !phone || !year || !branch) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Create registration data
    const registrationData = {
      id: Date.now().toString(),
      eventId,
      eventTitle,
      name,
      email,
      phone,
      year,
      branch,
      timestamp: new Date().toISOString(),
      status: 'registered'
    };
    
    // Save to JSON file
    const dbPath = path.join(process.cwd(), 'data');
    const registrationsPath = path.join(dbPath, 'event-registrations.json');
    
    // Create the data directory if it doesn't exist
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true });
    }
    
    // Read existing registrations
    let registrations = [];
    if (fs.existsSync(registrationsPath)) {
      const fileContent = fs.readFileSync(registrationsPath, 'utf8');
      registrations = JSON.parse(fileContent);
    }
    
    // Check if user already registered for this event
    const existingRegistration = registrations.find(
      reg => reg.email === email && reg.eventId === eventId
    );
    
    if (existingRegistration) {
      return NextResponse.json(
        { success: false, message: 'You have already registered for this event' },
        { status: 400 }
      );
    }
    
    // Add new registration
    registrations.push(registrationData);
    
    // Write updated registrations back to file
    fs.writeFileSync(registrationsPath, JSON.stringify(registrations, null, 2));
    
    console.log('Event registration saved successfully!');
    console.log('Total registrations now:', registrations.length);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Registration successful!',
      registrationData: registrationData
    });
    
  } catch (error) {
    console.error('Error processing event registration:', error);
    
    return NextResponse.json(
      { success: false, message: 'Failed to register for event' },
      { status: 500 }
    );
  }
}