import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';

export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    
    // Convert FormData to a regular object
    const data = {};
    for (let [key, value] of formData.entries()) {
      // Handle file upload
      if (key === 'resume' && value.size > 0) {
        const fileExt = value.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = path.join(process.cwd(), 'public/uploads', fileName);
        
        // Create the uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public/uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        // Convert file to buffer and write to disk
        const buffer = Buffer.from(await value.arrayBuffer());
        await writeFile(filePath, buffer);
        
        data[key] = `/uploads/${fileName}`;
      } else {
        data[key] = value;
      }
    }
    
    // Add timestamp to the data
    data.timestamp = new Date().toISOString();
    
    // Save to a JSON file
    const dbPath = path.join(process.cwd(), 'data');
    const applicationsPath = path.join(dbPath, 'applications.json');
    
    // Create the data directory if it doesn't exist
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath, { recursive: true });
    }
    
    // Read existing applications
    let applications = [];
    if (fs.existsSync(applicationsPath)) {
      const fileContent = fs.readFileSync(applicationsPath, 'utf8');
      applications = JSON.parse(fileContent);
    }
    
    // Add new application
    applications.push(data);
    
    // Write updated applications back to file
    fs.writeFileSync(applicationsPath, JSON.stringify(applications, null, 2));
    
    // Return success response with data for email
    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      applicationData: data // Send data back for email
    });
    
  } catch (error) {
    console.error('Error processing application:', error);
    
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    );
  }
}