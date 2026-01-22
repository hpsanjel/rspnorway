import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User.Model";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
	try {
		await connectDB();
		const { token, password } = await req.json();

		if (!token || !password) {
			return NextResponse.json({ error: "Missing token or password" }, { status: 400 });
		}

		if (password.length < 6) {
			return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
		}

		// Find user by setupToken and check expiry
		const user = await User.findOne({
			setupToken: token,
			setupTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Update user with password and clear setup token
		user.password = hashedPassword;
		user.setupToken = undefined;
		user.setupTokenExpiry = undefined;
		await user.save();

		return NextResponse.json({ success: true, message: "Password set successfully" }, { status: 200 });
	} catch (error: unknown) {
		console.error("Error setting password:", error);
		return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to set password" }, { status: 500 });
	}
}
