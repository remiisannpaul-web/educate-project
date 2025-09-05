import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    // Only allow seeding in development
    if (process.env.NODE_ENV === "production") {
      return Response.json(
        { error: "Seeding is not allowed in production" },
        { status: 403 }
      );
    }

    const result = await seedDatabase();

    return Response.json({
      message: "Database seeded successfully",
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return Response.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Only allow seeding in development
    if (process.env.NODE_ENV === "production") {
      return Response.json(
        { error: "Seeding is not allowed in production" },
        { status: 403 }
      );
    }

    const result = await seedDatabase();

    return Response.json({
      message: "Database seeded successfully",
      insertedCount: result.insertedCount,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return Response.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
