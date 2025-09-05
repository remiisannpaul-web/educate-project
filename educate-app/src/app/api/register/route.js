import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/user";

export async function POST(request) {
  await connectDB();
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const existing = await UserModel.findOne({ email: email.toLowerCase() });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 12);
  const user = await UserModel.create({
    email: email.toLowerCase(),
    password: hash,
  });

  return NextResponse.json(
    { message: "User created", user: { id: user._id, email: user.email } },
    { status: 201 }
  );
}
