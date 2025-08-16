import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("educate"); // Replace with your database name
    
    // Get programs from the 'programs' collection
    const programs = await db
      .collection("programs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json(programs);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("educate");
    
    const body = await request.json();
    
    // Add timestamp
    const program = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection("programs").insertOne(program);
    
    return Response.json(
      { message: 'Program created successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { error: 'Failed to create program' },
      { status: 500 }
    );
  }
}
