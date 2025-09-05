import { connectDB } from "./mongodb.js";
import Program from "@/models/program.js";

const samplePrograms = [
  {
    title: "Web Development Bootcamp",
    description:
      "Learn modern web development with React, Node.js, and full-stack technologies. Build real-world projects and launch your career in tech.",
    price: 999,
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    category: "Web Development",
    imageUrl: "/images/web-dev.jpg",
  },
  {
    title: "Data Science Fundamentals",
    description:
      "Master data analysis, machine learning, and statistical modeling. Work with Python, pandas, and scikit-learn to solve real data problems.",
    price: 1299,
    duration: "16 weeks",
    level: "Intermediate",
    category: "Data Science",
    imageUrl: "/images/data-science.jpg",
  },
  {
    title: "Mobile App Development",
    description:
      "Create iOS and Android apps using React Native. Learn mobile UI/UX design, app deployment, and monetization strategies.",
    price: 899,
    duration: "10 weeks",
    level: "Beginner to Advanced",
    category: "Mobile Development",
    imageUrl: "/images/mobile-dev.jpg",
  },
  {
    title: "Cybersecurity Essentials",
    description:
      "Learn network security, ethical hacking, and threat detection. Understand how to protect systems and data from cyber attacks.",
    price: 1499,
    duration: "14 weeks",
    level: "Intermediate to Advanced",
    category: "Cybersecurity",
    imageUrl: "/images/cybersecurity.jpg",
  },
  {
    title: "Cloud Computing & DevOps",
    description:
      "Master AWS, Docker, Kubernetes, and CI/CD pipelines. Learn to deploy and scale applications in the cloud.",
    price: 1199,
    duration: "12 weeks",
    level: "Intermediate",
    category: "Cloud & DevOps",
    imageUrl: "/images/cloud-devops.jpg",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Dive deep into artificial intelligence, neural networks, and deep learning. Build AI models and understand the future of technology.",
    price: 1699,
    duration: "18 weeks",
    level: "Advanced",
    category: "Artificial Intelligence",
    imageUrl: "/images/ai-ml.jpg",
  },
];

export async function seedDatabase() {
  try {
    await connectDB();
    console.log("Connected to database for seeding");

    // Clear existing data
    await Program.deleteMany({});
    console.log("Cleared existing programs");

    // Insert sample programs with timestamps
    const programsWithTimestamps = samplePrograms.map((program) => ({
      ...program,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const result = await Program.insertMany(programsWithTimestamps);

    console.log(`Successfully seeded ${result.length} programs`);
    return { insertedCount: result.length };
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run this function to seed the database
// seedDatabase().then(() => process.exit(0)).catch(console.error);
